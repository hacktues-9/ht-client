import style from "../../styles/0/teams/Team.module.scss";

const CreateProject = ({ createProject, isEditable }) => {
  return (
    <div
      className={style.project}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isEditable ? (
        <button className={style.createProject} onClick={createProject}>
          създай проект
        </button>
      ) : (
        <p>все още нямаме проект</p>
      )}
    </div>
  );
};

export default CreateProject;
