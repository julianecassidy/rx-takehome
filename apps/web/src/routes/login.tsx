import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { trpc } from "@/utils/trpc";
import React, { useState } from 'react';
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

    const updateUserStore = useUserDataStore((state) => state.getUserFromToken);
    async function handleLogin(evt: React.FormEvent) {
        evt.preventDefault();

        const { email, password } = formData;

        try {
            const response = await loginMutation.mutateAsync({ email, password });
            localStorage.setItem('token', response.token); // Store token in localStorage
            updateUserStore(response.token);
            navigate({ to: '/cabinet' });
        } catch (error: unknown) {
            if (error instanceof TRPCError) {
                setFormErrors([error.message || error.code]);
            }
        }
    };

    return (
        <div className="flex flex-col gap-4 items-center">
            <h2>Login</h2>
            <form className="w-7/8 md:w-1/2 flex flex-col gap-4 items-center">
                <label className="input input-bordered flex items-center gap-2 w-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                    /></label>

                <button className="btn btn-primary w-1/2" onClick={handleLogin}>Login</button>
                {formErrors.length
                    ? <Alert messages={formErrors} />
                    : null
                }
            </form>
        </div>
    );
};