import { useState, useEffect } from "react";
import { getClicksForUrl } from "@/db/apiClicks";

interface UseFetchClicksReturn {
  data: any;
  loading: boolean;
  error: any;
  refetch: () => void;
}

const useFetchClicks = (url_id: string): UseFetchClicksReturn => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getClicksForUrl(url_id);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url_id) {
      fetchData();
    }
  }, [url_id]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetchClicks;
