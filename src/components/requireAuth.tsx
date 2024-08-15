/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";
import { useUrlContext } from "@/context";
import { BarLoader } from "react-spinners";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useUrlContext() as {
    loading: boolean;
    isAuthenticated: boolean;
  };

  useEffect(() => {
    if (!isAuthenticated && !loading) navigate("/auth");
  }, [isAuthenticated, loading, navigate]);

  // if (loading) return <BarLoader width={"100%"} color="#36d7b7" />;

  if (isAuthenticated) return <>{children}</>;

  return null; // Ensure the component always returns a valid React element
};

export default RequireAuth;
