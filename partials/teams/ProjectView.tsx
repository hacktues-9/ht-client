import { useState } from "react";
import style from "../../styles/0/teams/Team.module.scss";

import Image from "next/image";
import { TbBrandGithub, TbWorldWww } from "react-icons/tb";

const ProjectView = ({ project, isEditing, editProject, saveProject, isEditable }) => {
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
      <div className={style.project_info}>
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
            <div className={style.links}>
              <div className={style.linkContainer}>
                <TbBrandGithub size={28} />
                <input
                  type="text"
                  className={style.link}
                  placeholder="https://github.com/edikakvosi/proekt"
                  value={project?.github}
                  //onChange={(e) => setProject({ ...project, name: e.target.value })}
                />
              </div>
              <div className={style.linkContainer}>
                <TbWorldWww size={28} style={{
                  fontWeight: '300'
                }}/>
                <input
                  type="text"
                  className={style.link}
                  placeholder="https://example.com"
                  value={project?.link}
                  //onChange={(e) => setProject({ ...project, name: e.target.value })}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </>
        )}
      </div>
      {isEditable && (
        <button
          className={style.editProject}
          onClick={isEditing ? saveProject : editProject}
        >
          {isEditing ? "запази" : "редактирай"}
        </button>
      )}
    </div>
  );
};

export default ProjectView;
