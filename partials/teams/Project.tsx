import { useEffect, useState } from "react";
import useSWR from "swr";

import ProjectView from "./ProjectView";
import CreateProject from "./CreateProject";
import router from "next/router";

const Project = ({ team, setTeam, isEditable }) => {
  // api call to get if team project is created or not
  const [isProjectCreated, setIsProjectCreated] = useState(
    team?.project.name !== ""
  );
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  const { teamId } = router.query as { teamId: string };

  const createProject = () => {
    // api call to create project - or maybe not - discuss tmrw
    setIsProjectCreated(true);
    setIsEditing(true);
  };

  const editProject = () => {
    setIsEditing(true);
  };

  const saveProject = async () => {
    return 0; // cant call api :)))))
    if (isEditing) {
      if (team.project.name.length < 3) {
        setError("името на проекта трябва да е поне 3 символа");
        return;
      } else if (team.project.description.length > 22) {
        setError("описанието на проекта трябва да е поне 22 символа");
        return;
      } else {
        setError(null);
      }

      if (team.project.description.length < 10) {
        setError("описанието на проекта трябва да е поне 10 символа");
        return;
      } else if (team.project.description.length > 1024) {
        setError("описанието на проекта трябва да е максимум 1024 символа");
        return;
      } else {
        setError(null);
      }

      // https://github.com/user/repo
      // https://api.github.com/<user>/<repo> - check if repo exists
      if (team.project.links.github) {
        let user = "";
        let repo = "";
        if (
          team.project.links.github.includes("https://") ||
          team.project.links.github.includes("http://")
        ) {
          user = team.project.links.github.split("/")[3];
          repo = team.project.links.github.split("/")[4];
        } else {
          user = team.project.links.github.split("/")[1];
          repo = team.project.links.github.split("/")[2];
        }

        // fetch(`https://api.github.com/repos/${user}/${repo}`)
        //   .then((res) => res.json())
        //   .then((data) => {
        //     if (data.message === "Not Found") {
        //       setError("това хранилище не съществува");
        //       return;
        //     } else {
        //       setError(null);
        //     }
        //   })
        //   .catch((err) => {
        //     setError("нещо май се обърка :(");
        //   });
        // fetch with await
        const res = await fetch(`https://api.github.com/repos/${user}/${repo}`);
        const data = await res.json();
        if (data.message === "Not Found") {
          setError("това хранилище не съществува");
          return;
        } else {
          setError(null);
        }
      }

      fetch(`https://api.hacktues.bg/api/team/update/${teamId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(team),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setError(null);
            setIsEditing(false);
          } else {
            setError(data.error);
          }
        })
        .catch((err) => {
          setError("нещо май се обърка :(");
        });
    }
  };

  useEffect(() => {
    if (team.project.name !== "") {
      setIsProjectCreated(true);
    }
  }, [team]);

  if (isProjectCreated)
    return (
      <ProjectView
        project={team.project}
        error={error}
        setTeam={setTeam}
        editProject={editProject}
        isEditing={isEditing}
        saveProject={saveProject}
        isEditable={isEditable}
      />
    );

  return (
    <CreateProject createProject={createProject} isEditable={isEditable} />
  );
};

export default Project;
