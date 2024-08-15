import { useState } from "react";

interface UseFetchOptions {
  [key: string]: any;
  id?: string;
}

interface UseFetchReturn {
  data: any;
  loading: boolean;
  error: any;
  fn: (...args: any[]) => Promise<void>;
}
const useMyFetch = (
  cb: (...args: any[]) => Promise<any>,
  options: UseFetchOptions = {}
): UseFetchReturn => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fn: UseFetchReturn["fn"] = async (...args: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cb({ ...options, ...args[0] }, args[1]); // Ensure correct argument separation
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useMyFetch;
