import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/app/store/store';

export default function RequireAuth() {
  const { authenticated, initialised } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!authenticated && initialised) {
    return <Navigate to='/auth/login' replace state={{ from: location }} />;
  }

  return <Outlet />;
}
