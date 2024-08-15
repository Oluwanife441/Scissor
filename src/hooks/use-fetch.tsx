import { useState } from "react";

interface UseFetchOptions {
  [key: string]: any;
}

interface UseFetchReturn {
  data: any;
  loading: boolean;
  error: any;
  fn: (...args: any[]) => Promise<void>;
}

const useFetch = (
  cb: (...args: any[]) => Promise<any>,
  id?: string, // added a separate argument for the id
  options: UseFetchOptions = {}
): UseFetchReturn => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fn: UseFetchReturn["fn"] = async (...args: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cb(id, options, ...args); // pass id and options as separate arguments to cb
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;
