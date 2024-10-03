import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
  <>
  <NavBar />
  <Outlet />
  <Footer />
  </>
  )
});