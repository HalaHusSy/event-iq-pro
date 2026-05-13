import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Role, canAccess, useRole } from '@/lib/auth';

interface ProtectedRouteProps {
  allowed: Role[];
  children: ReactNode;
}

export default function ProtectedRoute({ allowed, children }: ProtectedRouteProps) {
  const role = useRole();
  const location = useLocation();

  if (!canAccess(role, allowed)) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
