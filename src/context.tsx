import { createContext, useContext, useEffect, ReactNode } from "react";
import { getCurrentUser } from "./db/apiAuth";
import useFetch from "./hooks/use-fetch";

// Define types for the user and context
interface User {
  id: string; // or number, depending on your data type
  role?: string;
  // Add other properties if necessary
}

interface UrlContextType {
  user: User | null;
  fetchUser: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const UrlContext = createContext<UrlContextType | undefined>(undefined);

interface UrlProviderProps {
  children: ReactNode;
}

const UrlProvider: React.FC<UrlProviderProps> = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

export const useUrlContext = () => {
  const context = useContext(UrlContext);
  if (context === undefined) {
    throw new Error("useUrlState must be used within a UrlProvider");
  }
  return context;
};

export default UrlProvider;
