import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { trpc } from "@/utils/trpc";
import { useState } from 'react';
import Alert from '@/components/Alert';
import { TRPCError } from '@trpc/server';
import { useUserDataStore } from '@/utils/userStore';

export const Route = createFileRoute('/login')({
    component: Login,
});

type FormDataState = {
    email: string;
    password: string;
};

function Login() {
    const [formData, setFormData] = useState<FormDataState>({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const loginMutation = trpc.user.login.useMutation();


    const navigate = useNavigate({ from: '/login' });

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const fieldName = evt.target.name as keyof FormDataState;
        const value = evt.target.value;

        setFormData((currData: FormDataState) => {
            currData[fieldName] = value;
            return { ...currData };
        });
    };

    const updateUser = useUserDataStore((state) => state.updateUserData);
    const handleLogin = async () => {
        const { email, password } = formData;
        try {
            const response = await loginMutation.mutateAsync({ email, password });
            localStorage.setItem('token', response.token); // Store token in localStorage
            updateUser(response.token);
            navigate({ to: '/cabinet' });
        } catch (error: unknown) {
            if (error instanceof TRPCError) {
                setFormErrors([error.message || error.code]);
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
            {formErrors.length
                ? <Alert messages={formErrors} />
                : null
            }
        </div>
    );
};