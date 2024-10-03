import NavBar from '@/components/NavBar';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
  <>
  <NavBar />
  <Outlet />
  </>
  )
});