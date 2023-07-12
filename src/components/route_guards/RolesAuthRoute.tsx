import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import { Roles } from "../../types";
import useUserAuth from "../../hooks/useUserAuth ";

interface Props {
  children: ReactNode;
  requiredRole: Roles;
}

const RolesAuthRoute = ({ children, requiredRole }: Props) => {
  const { isAuthenticated, user, isLoading } = useUserAuth();



  if (user?.role !== requiredRole) {
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
};

export default RolesAuthRoute;
