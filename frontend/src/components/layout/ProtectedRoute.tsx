import { Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { isAuthenticatedAtom } from '@/store/authAtoms';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
