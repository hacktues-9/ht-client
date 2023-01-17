import { useRouter } from "next/router";

const CreateProject = () => {
    const router = useRouter();
    const { teamId } = router.query;

    //const { data: team } = useSWR<Team>(`/api/teams/${teamId}`, fetcher);

    //f (!team) return null;

    return (
        <div>
            <h1>Create Project</h1>
            {/* <p>Team: {team.name}</p> */}
        </div>
    );
};


export default CreateProject;