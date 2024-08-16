import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getCurrentUser } from "./db/apiAuth";
import supabase from "./db/supabase";
import useFetch from "./hooks/use-fetch";

interface User {
  id: string;
  role?: string;
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
  const [user, setUser] = useState<User | null>(null);
  const { loading, fn: fetchUser } = useFetch(async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  });

  const isAuthenticated = user !== null;

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        fetchUser();
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
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
