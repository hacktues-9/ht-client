import { useRouter } from "next/router";
import { useAuthContext } from "../../context/authContext";
import { inTeam } from "../../utils/auth";

const Team = () => {
  const router = useRouter();
  const { teamId } = router.query as { teamId: string };
  const { authState } = useAuthContext();

  // check if user has rights to edit this team

  if (inTeam(authState.userId, teamId)) return <div>Your Team {teamId}</div>;
  return <div>Team {teamId}</div>;
};

export default Team;
