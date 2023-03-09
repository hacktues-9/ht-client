import { useState } from "react";
import style from "../../styles/0/teams/Team.module.scss";

import Image from "next/image";

const ProjectView = ({ project, editProject, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      className={style.project}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 
            - name
            - description
            - photos
        */}
      <div className={style.projectInfo}>
        {isEditing ? (
          <>
            <input
              type="text"
              placeholder="име на проекта"
              value={project?.name}
              //onChange={(e) => setProject({ ...project, name: e.target.value })}
            />
            <textarea
              placeholder="описание на проекта"
              value={project?.description}
              //   onChange={(e) =>
              //     setProject({ ...project, description: e.target.value })
              //   }
            />
          </>
        ) : (
          <>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </>
        )}
      </div>
      <div className={style.projectPhotos}>
        {/*
                - photos - max 3
            */}

        {project?.photos?.map((photo, index) => {
          return (
            <Image
              key={index}
              src={photo}
              width={192}
              height={108}
              alt="project photo"
            />
          );
        })}
        {/* add photo if under 3 */}
        {project?.photos?.length < 3 && isEditable && (
          <button className={style.addPhoto}>+</button>
        )}
      </div>
      {isEditable && (
        <button
          className={style.editProject}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "запази" : "редактирай"}
        </button>
      )}
    </div>
  );
};

export default ProjectView;
