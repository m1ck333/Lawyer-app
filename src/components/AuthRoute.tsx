import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import useUserAuth from "../hooks/useUserAuth ";

interface Props {
  children: ReactNode;
  privateRoute?: boolean;
}

const AuthRoute = ({ children, privateRoute }: Props) => {
  const { isAuthenticated, isLoading } = useUserAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (privateRoute && !isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }

  if (!privateRoute && isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
};

export default AuthRoute;
