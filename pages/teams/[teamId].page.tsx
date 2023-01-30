import { useRouter } from "next/router";
import { useAuthContext } from "../../context/authContext";
import { inTeam } from "../../utils/auth";

import style from "../../styles/0/teams/Team.module.scss";
import Select from "react-dropdown-select";
import { TECHNOLOGIES } from "../../constants/technologies";
import { useState } from "react";
import Image from "next/image";
import { TbBrandGithub, TbGlobe, TbMinus, TbPlus, TbX } from "react-icons/tb";
import { ROLES } from "../../constants/teams";

const Technologies = ({ team, setTeam, disabled, isEditable }) => {
  return (
    <div className={style.sel}>
      <label className={style.label} htmlFor="teamTechologies">
        технологии
      </label>
      <Select
        //label="технологии"
        //classes={["email"]}
        //id="teamTechnologies"
        name="teamTechnologies"
        //type="select"
        options={TECHNOLOGIES.map((tech) => {
          return { value: tech.name, label: tech.name, ...tech };
        })}
        values={team.technologies?.map((tech) => {
          return { value: tech, label: tech };
        })}
        onChange={(e) =>
          setTeam({
            ...team,
            technologies: e.map((tech) => tech.value),
          })
        }
        className={style.select}
        placeholder="C++ Java Angular"
        searchBy="label"
        searchable={true}
        multi={true}
        required={true}
        keepSelectedInList={true}
        dropdownHandle={false}
        debounceDelay={300}
        disabled={disabled}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "6px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.2)",
          padding: ".5rem",
          height: "198px",
        }}
      />
    </div>
  );
};

const TeamInfo = ({ team, setTeam, edit, setEdit, isEditable }) => {
  return (
    <div className={style.team_info}>
      <div className={style.team_info_information}>
        <div className={style.team_info_information_header}>
          <Image
            src="/images/team.png"
            alt="Team Logo"
            width={72} // 4.5 rem
            height={72}
          />
          <h1>
            {isEditable && edit ? (
              <input
                type="text"
                name="teamName"
                id="teamName"
                value={team.name}
                onChange={(e) => setTeam({ ...team, name: e.target.value })}
              />
            ) : (
              team.name
            )}
          </h1>
          {isEditable && (
            <button
              onClick={() => {
                setEdit(!edit);
              }}
            >
              {edit ? "запази" : "промени"}
            </button>
          )}
        </div>
        <div className={style.team_info_information_description}>
          <p>
            {edit ? (
              <textarea
                name="teamDescription"
                id="teamDescription"
                cols={30}
                rows={10}
                value={team.description}
                onChange={(e) =>
                  setTeam({ ...team, description: e.target.value })
                }
              ></textarea>
            ) : (
              team.description
            )}
          </p>
        </div>
        <div className={style.team_info_information_links}>
          <a href={"https://github.com/AyyMDTechTips"}>
            <TbBrandGithub size={32} />
            <p>AyyMDTechTips</p>
          </a>
        </div>
      </div>
      <div className={style.team_info_technologies}>
        <Technologies team={team} setTeam={setTeam} disabled={!edit} />
      </div>
    </div>
  );
};

const TeamMembers = ({ team, setTeam, isEditable }) => {
  const kickMember = (id) => {
    // TODO: kick member from team API

    setTeam({
      ...team,
      members: team.members.filter((member) => member.id !== id),
    });
  };

  const contextMenu = (e) => {
    e.preventDefault();
    // TODO: Kalata -> make custom right click menu -> kick member or make captain
  };

  return (
    <div className={style.members}>
      <div className={style.members_header}>
        <h2>участници</h2>
        {isEditable && team?.members?.length < 5 && (
          <button>
            <TbPlus size={32} />
          </button>
        )}
      </div>
      <div className={style.members_list}>
        {team?.members?.map((member) => {
          return (
            <div
              className={style.member}
              onContextMenu={contextMenu}
              key={member}
            >
              <div className={style.member_info}>
                <Image
                  src={member.avatar}
                  alt={`${member.name} avatar`}
                  width={48} // 4.5 rem
                  height={48}
                />
                <p>{member.name}</p>
              </div>
              <p className={style.member_role}>{ROLES[member.role]}</p>

              {isEditable && member.role !== "CAPTAIN" && (
                <button onClick={() => kickMember(member.id)}>
                  <TbX size={32} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};


// TODO: FINISH PROJECTS WITH API AND FRONT 
const TeamProject = ({ team, setTeam, isEditable }) => {
  const [edit, setEdit] = useState(false);
  //const [project, setProject] = useState(team?.project);

  // only one project per team
  return (
    <div className={style.project}>
      <div className={style.project_header}>
        <Image
          src={team?.project?.logo || "/images/project.png"}
          alt={`${team?.project?.name} logo`}
          width={64} // 4 rem
          height={64}
        />
        <h2>{team?.project?.name}</h2>
        {isEditable && (
          <button
            onClick={() => {
              setEdit(!edit);
            }}
          >
            {edit ? "запази" : "промени"}
          </button>
        )}
      </div>
      <div className={style.teamProject__description}>
        <p>
          {team?.project?.description || "няма описание на проекта, жалко :("}
        </p>
      </div>

      <div className={style.project_links}>
        <a href={team?.project?.links?.github}>
          <TbBrandGithub size={32} />
          <p>{team?.project?.links?.github}</p>
        </a>
        <a href={team?.project?.links?.website}>
          <TbGlobe size={32} />
          <p>{team?.project?.links?.website}</p>
        </a>
      </div>

      <div className={style.project_technologies}></div>
    </div>
  );
};

const Team = () => {
  const router = useRouter();
  const { teamId } = router.query as { teamId: string };
  const { authState } = useAuthContext();

  // TODO: check if user has rights to edit this team - aka is captain
  // TODO: check if user is in this team

  /* if (!inTeam(authState.userId, teamId)) {
  } */

  const editable = true;

  // TODO: Get Team Info form api
  // swr

  const [team, setTeam] = useState({
    name: "Team Name",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec",
    technologies: ["C++", "Java", "Angular"],
    members: [
      {
        id: "1",
        name: "Калоян Георгиев",
        avatar: "/images/avatar.png",
        role: "CAPTAIN",
      },
      {
        id: "2",
        name: "Лъчезар Топалов",
        avatar: "/images/avatar.png",
        role: "MEMBER",
      },
      {
        id: "3",
        name: "Калина Вълева",
        avatar: "/images/avatar.png",
        role: "MEMBER",
      },
      {
        id: "4",
        name: "Мина Славова",
        avatar: "/images/avatar.png",
        role: "MEMBER",
      },
      /*       {
        id: "3",
        name: "John Doe",
        avatar: "/images/avatar.png",
        role: "MEMBER",
      }, */
    ],
    project: {
      name: "Project Name",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      logo: "/images/project.png",
      links: {
        github: "https://github.com",
        website: "https://github.com",
      },
    },
  });

  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
    // TODO: send team info to api
  };

  return (
    <div className={style.page}>
      <div className={style.page_top}>
        <TeamInfo
          team={team}
          setTeam={setTeam}
          edit={edit}
          setEdit={setEdit}
          isEditable={editable}
        />
      </div>
      <div className={style.page_bottom}>
        <TeamProject team={team} setTeam={setTeam} isEditable={editable} />
        <TeamMembers team={team} setTeam={setTeam} isEditable={editable} />
      </div>
    </div>
  );
};

export default Team;
