import useSWR from "swr";

import { useRouter } from "next/router";

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

const ConfirmEmailPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const { data, error } = useSWR(
    "/api/confirm-email",
    fetcher.bind(null, token)
  );

  /*   useEffect(() => {
    if (token) {
      confirmEmail({
        variables: {
          token: token as string,
        },
      });
    }
  }, [token]);

    if (loading) {
    return <div>Loading...</div>;

    if (error) {
    return <div>{error.message}</div>;
  } */

  return <div>успешно си потвърди имейла</div>;
};

export default ConfirmEmailPage;
