import { RouterProvider, createRouter } from '@tanstack/react-router';
import { TrpcWrapper } from './components/TrpcWrapper';
import './index.css';
import { routeTree } from './routeTree.gen';
import { useUserDataStore } from '@/utils/userStore';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  const token: string | null = localStorage.getItem('token'); // Get token from localStorage if exists

  const updateUserStore = useUserDataStore((state) => state.getUserFromToken);
  if(token) {
    updateUserStore(token);
  }

  return (
    <TrpcWrapper>
      <RouterProvider router={router} />
    </TrpcWrapper>
  );
}
