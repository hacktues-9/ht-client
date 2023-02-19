import { useRouter } from "next/router";

const Verify = () => {
  const router = useRouter();
  const { status } = router.query;

  return (
    <div>
      <h1>Verify</h1>
      <p>status: {status}</p>
    </div>
  );
};

export default Verify;
