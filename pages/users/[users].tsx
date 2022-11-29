import { useRouter } from "next/router";

const User = () => {
    const router = useRouter();
    const { users } = router.query;

    return <h1>User: {users}</h1>;
};

export default User;
