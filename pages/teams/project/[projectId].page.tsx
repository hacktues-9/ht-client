import { useRouter } from "next/router";

const ProjectPage = () => {
  const router = useRouter();
  const { projectId } = router.query;

  return (
    <div>
      <h1>Project {projectId}</h1>
    </div>
  );
};

export default ProjectPage;
