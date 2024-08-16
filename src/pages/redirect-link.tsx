import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import useMyFetch from "@/hooks/use-fetcth2";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, data, fn } = useFetch(getLongUrl, id);
  const { loading: loadingStats, fn: fnStats } = useMyFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    if (id) {
      fn();
    }
  }, [id, fn]);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
      // Redirect to the original URL
      window.location.href = data.original_url;
    }
  }, [loading, data, fnStats]);

  if (loading || loadingStats) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <BarLoader width={"200px"} color="#36d7b7" />
        <p className="mt-4">Redirecting...</p>
      </div>
    );
  }

  return null;
};

export default RedirectLink;
