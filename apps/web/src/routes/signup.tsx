import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { trpc } from "@/utils/trpc";
import { useState } from 'react';
import Alert from '@/components/Alert';
import { TRPCError } from '@trpc/server';

export const Route = createFileRoute('/signup')({
  component: Signup,
});

type FormDataState = {
  email: string;
  password: string;
  name: string;
};

function Signup() {
  const [formData, setFormData] = useState<FormDataState>({ email: "", password: "", name: "" });
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const signupMutation = trpc.user.create.useMutation();

  const navigate = useNavigate({ from: '/signup' });

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const fieldName = evt.target.name as keyof FormDataState;
    const value = evt.target.value;

    setFormData((currData: FormDataState) => {
      currData[fieldName] = value;
      return { ...currData };
    });
  };

  const handleSignup = async () => {
    const { email, password, name } = formData;
    try {
      const response = await signupMutation.mutateAsync({ email, password, name });
      localStorage.setItem('token', response.token); // Store token in localStorage
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
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
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
      <button onClick={handleSignup}>Login</button>
      {formErrors.length
        ? <Alert messages={formErrors} />
        : null
      }
    </div>
  );
};