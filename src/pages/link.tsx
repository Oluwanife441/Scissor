import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import { getUrl, deleteUrl } from "@/db/apiUrls";
import { useUrlContext } from "@/context";
import useFetchLink from "@/hooks/use-fetchLink";
import useFetchClicks from "@/hooks/useFetchClicks";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Location from "@/components/location-stats";
import Device from "@/components/device-stats";

// interface Url {
//   id: string;
//   title: string;
//   custom_url?: string;
//   short_url: string;
//   qr: string;
//   original_url?: string;
//   created_at?: string;
// }

const Link: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useUrlContext();
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const {
    loading: loadingUrl,
    data: url,
    fn: fetchUrl,
    error: urlError,
  } = useFetchLink(getUrl, { id, user_id: user?.id });

  const { loading: loadingDelete, fn: fnDelete } = useFetchLink(deleteUrl, {
    id,
  });

  // Use deleteUrlFn where needed
  const handleDelete = async () => {
    await fnDelete();
    // Handle post-delete logic here
  };

  const {
    loading: loadingClicks,
    data: clicks,
    error: clicksError,
    refetch: refetchClicks,
  } = useFetchClicks(id ?? "");

  useEffect(() => {
    fetchUrl();
    refetchClicks();
  }, [id]);

  useEffect(() => {
    if (urlError) {
      navigate("/dashboard");
    }
  }, [urlError]);

  if (loadingUrl || loadingClicks) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  if (urlError || clicksError) {
    return <div>Error loading data</div>;
  }

  let link = "";
  if (url) {
    link = url.custom_url ? url.custom_url : url.short_url;
  }

  return (
    <>
      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={`https://scissor-orpin.vercel.app/${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer break-all"
          >
            scissor-orpin.vercel.app/{link}
          </a>
          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            <span className="break-all">{url?.original_url}</span>
          </a>
          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://scissor-orpin.vercel.app/${link}`
                )
              }
            >
              <Copy />
            </Button>
            <Button variant="ghost" onClick={() => downloadImage()}>
              <Download />
            </Button>
            <Button
              variant="ghost"
              onClick={handleDelete}
              disabled={loadingDelete}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>
          <img
            src={url?.qr}
            className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
            alt="qr code"
          />
        </div>
        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {clicks && clicks.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{clicks.length}</p>
                </CardContent>
              </Card>
              <CardContent>
                Location stats
                <Location stats={clicks} />
              </CardContent>
              <CardContent>Device info</CardContent>
              <Device stats={clicks} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingClicks === false
                ? "No statistics yet"
                : "Loading statistics..."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
