import React from "react";

const Link = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = UrlState();
  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });
  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);
  if (error) {
    navigate("/dashboard");
  }
  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      <div>
        <span>{url?.title}</span>
      </div>
    </>
  );
};

export default Link;
