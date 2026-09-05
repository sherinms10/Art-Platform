import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AdminProtectedRouteProps {
  children: ReactNode;
}

const AdminProtectedRoute = ({
  children,
}: AdminProtectedRouteProps) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;