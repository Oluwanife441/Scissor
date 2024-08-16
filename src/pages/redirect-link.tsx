import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import useMyFetch from "@/hooks/use-fetcth2";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

// interface UrlData {
//   id: string;
//   original_url: string;
// }

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
      window.location.href = data.original_url;
      fnStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  }

  return null;
};

export default RedirectLink;
