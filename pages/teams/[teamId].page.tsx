import { useRouter } from "next/router";
import { useAuthContext } from "../../context/authContext";
import { inTeam } from "../../utils/auth";

import useSWR from "swr";

import style from "../../styles/0/teams/Team.module.scss";
import Select from "react-dropdown-select";
import { TECHNOLOGIES } from "../../constants/technologies";
import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import {
  TbBrandGithub,
  TbGlobe,
  TbMinus,
  TbPlus,
  TbUserCheck,
  TbUserPlus,
  TbUserX,
  TbX,
} from "react-icons/tb";
import { ROLES } from "../../constants/teams";
import Input from "../../components/form/Input";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

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
        disabled={disabled || !isEditable}
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

const TeamInfo = ({ team, setTeam, edit, setEdit, isEditable, teamId }) => {
  const [error, setError] = useState({
    name: null,
    description: null,
    technologies: null,
    profilePicture: null,
    general: null,
  });

  const validateName = async (team, error) => {
    if (!team.name) {
      return {
        ...error,
        name: "Моля въведете име на екипа",
      };
    } else if (team.name.length < 3) {
      return {
        ...error,
        name: "Името на екипа трябва да е поне 3 символа",
      };
    } else if (team.name.length > 28) {
      return {
        ...error,
        name: "Името на екипа трябва да е по-малко от 28 символа",
      };
    } else {
      return {
        ...error,
        name: null,
      };
    }
  };

  const validateDescription = async (team, error) => {
    if (!team.description) {
      return {
        ...error,
        description: "Моля въведете описание на екипа",
      };
    } else if (team.description.length < 10) {
      return {
        ...error,
        description: "Описанието на екипа трябва да е поне 10 символа",
      };
    } else if (team.description.length > 140) {
      return {
        ...error,
        description:
          "Описанието на екипа трябва да е по-малко от 140 символа, или колкото един tweet",
      };
    } else {
      return {
        ...error,
        description: null,
      };
    }
  };

  const validateTeam = async (team) => {
    let error = {
      name: null,
      description: null,
      technologies: null,
      profilePicture: null,
      general: null,
    };

    error = await validateName(team, error);
    error = await validateDescription(team, error);

    return error;
  };

  const handleEdit = async () => {
    if (edit) {
      // validate team
      const error = await validateTeam(team);
      setError(error);
      if (error.name || error.description) {
        return;
      }

      // TODO: Send request to update team MARTO
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
          console.log(data);
          // TODO: If successfull, set edit to false
          if (data.status === 200) {
            setEdit(false);
            // TODO: If not, show error
          } else {
            setError({
              ...error,
              general: data.error,
            });
          }
        })
        .catch((err) => {
          // TODO: remove next line in real use
          setEdit(false);
          console.log("UPDATE TEAM INFO", err);
        });
    }
  };

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
              <>
                <input
                  type="text"
                  name="teamName"
                  id="teamName"
                  value={team.name}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "white",
                    fontSize: "2rem",
                    fontWeight: "800",
                    fontFamily: "inherit",
                    margin: "0",
                    padding: "0",
                    outline: "none",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                  onChange={(e) => setTeam({ ...team, name: e.target.value })}
                />
                {error.name && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "1rem",
                      fontWeight: "400",
                      fontFamily: "inherit",
                      margin: "0",
                      padding: "0",
                    }}
                  >
                    {error.name}
                  </p>
                )}
              </>
            ) : (
              team.name
            )}
          </h1>
          {isEditable && (
            <button
              onClick={() => {
                edit ? handleEdit() : setEdit(true);
              }}
            >
              {edit ? "запази" : "промени"}
            </button>
          )}
        </div>
        <div className={style.team_info_information_description}>
          <p
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {edit ? (
              <>
                <textarea
                  name="teamDescription"
                  id="teamDescription"
                  value={team.description}
                  style={{
                    backgroundColor: "transparent",
                    width: "100%",
                    height: "100%",
                    border: "none",
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "400",
                    fontFamily: "inherit",
                    margin: "0",
                    padding: "0",
                    resize: "none",
                    outline: "none",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                  onChange={(e) =>
                    setTeam({ ...team, description: e.target.value })
                  }
                ></textarea>
                {error.description && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "1rem",
                      fontWeight: "400",
                      fontFamily: "inherit",
                      margin: "0",
                      padding: "0",
                    }}
                  >
                    {error.description}
                  </p>
                )}
              </>
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
        <Technologies
          team={team}
          setTeam={setTeam}
          disabled={!edit}
          isEditable={isEditable}
        />
      </div>
    </div>
  );
};

const handleInvite = (user: any, team: any) => {
  // TODO: invite user to team - API

  fetch(`https://api.hacktues.bg/api/team/invite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      teamId: team,
      userId: user,
    }),
    credentials: "include",
  }).then((res) => {
    console.log(res);

    if (res.status === 200) {
      console.log("User invited successfully");
    } else {
      console.log("Error inviting user");
    }
  });
};

const SearchPeople = ({ teamId }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [alreadyInvited, setAlreadyInvited] = useState([]);

  useEffect(() => {
    // TODO: get already invited users or members - API
    // setAlreadyInvited([...alreadyInvited, ...res.data]);

    fetcher(`https://api.hacktues.bg/api/team/get/invitees/${teamId}`).then(
      (res) => {
        console.log(res);
        if (res?.data) {
          setAlreadyInvited([...alreadyInvited, ...res.data]);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      fetcher(`https://api.hacktues.bg/api/team/users/search?search=${search}`)
        .then((res) => {
          if (res?.data) {
            res.data.map((user) => {
              if (
                alreadyInvited.find((invited) => invited.email === user.email)
              ) {
                user.isInvited = true;
              }
              return user;
            });
            setResults(res?.data);
          } else {
            setResults([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [search]);

  return (
    <div className={style.search}>
      <Input
        label="търси хора"
        classes={["email"]}
        id="search"
        name="search"
        type="text"
        placeholder="Мартин Божинов"
        required={false}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search.length > 0 && (
        <ul className={style.results}>
          {results.length === 0 && (
            <li className={style.person}>
              <p>Няма резултати</p>
            </li>
          )}
          {results &&
            results.map((result) => (
              <li key={result.id} className={style.person}>
                <div className={style.person_info}>
                  <Image
                    src={result.profile_picture}
                    alt={result.name}
                    width={64}
                    height={64}
                    className={style.person_avatar}
                  />
                  <p>{result.name}</p>
                </div>
                <button
                  disabled={result.isInvited}
                  type="button"
                  className={style.person_invite}
                  onClick={() => {
                    handleInvite(result.id, teamId);
                    result.isInvited = true;
                  }}
                >
                  <TbUserCheck />
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

const ContextMenu = ({ id, kickMember }) => {
  return (
    <div className={style.context_menu}>
      <button
        type="button"
        className={style.context_menu_button}
        style={{
          // calculete position
          width: "fit-content",
          height: "fit-content",
          borderRadius: "0.5rem",
          padding: "0.5rem",
          position: "absolute",
          top: "calc(100% + 1rem)",
          right: "0",
          
        }}
        onClick={() => kickMember(id)}
      >
        <TbUserX />
        <p>премахни</p>
      </button>
    </div>
  );
};

const TeamMembers = ({ team, setTeam, isEditable }) => {
  const [isInviting, setIsInviting] = useState(false);
  const [openContextMenu, setOpenContextMenu] = useState(false);

  const kickMember = (id) => {
    // TODO: kick member from team API
    fetcher(`https://api.hacktues.bg/api/team/kick/${id}`).then((res) => {
      console.log(res);
      if (res.status === 200) {
        console.log("User kicked successfully");
      } else {
        console.log("Error kicking user");
      }
    });

    setTeam({
      ...team,
      members: team.members.filter((member) => member.id !== id),
    });
  };

  const contextMenu = (e) => {
    e.preventDefault();
    // TODO: Kalata -> make custom right click menu -> kick member or make captain
    setOpenContextMenu(true);
  };

  const handleInviteMember = () => {
    setIsInviting(!isInviting);
  };

  return (
    <div className={style.members}>
      <div className={style.members_header}>
        <h2>участници</h2>
        {isEditable && team?.members?.length < 5 && (
          <button onClick={handleInviteMember}>
            {isInviting ? <TbX size={32} /> : <TbUserPlus size={32} />}
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
              style={{
                position: "relative",
              }}
            >
              {openContextMenu && (
                <ContextMenu id={member.id} kickMember={kickMember} />
              )}
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
      {isInviting && <SearchPeople teamId={team.id} />}
    </div>
  );
};

// TODO: FINISH PROJECTS WITH API AND FRONT
const TeamProject = ({ team, setTeam, isEditable }) => {
  /*   const [edit, setEdit] = useState(false);
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
  ); */

  // TODO: Change on the 8th of March

  return (
    <div
      className={style.project}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      за проект са ти нужни теми пръво?
    </div>
  );
};

const Team = () => {
  const router = useRouter();
  const { teamId } = router.query as { teamId: string };
  const { authState } = useAuthContext();
  let editable = false;

  // TODO: check if user has rights to edit this team - aka is captain

  // api call to https://api.hacktues.bg/api/team/captain/{teamId} -> returns captain id and compare with userId
  const { data: isCaptainResp } = useSWR(
    `https://api.hacktues.bg/api/team/captain/${teamId}`,
    fetcher
  );

  // TODO: check if user is in this team

  // use member list from team api call to check if user is in team

  /* if (!inTeam(authState.userId, teamId)) {
  } */

  // TODO: Get Team Info form api
  // swr
  const { data: teamData } = useSWR(
    `https://api.hacktues.bg/api/team/get/${teamId}`,
    fetcher
  );

  console.log(teamData?.data);

  const [team, setTeam] = useState(teamData?.data);

  if (isCaptainResp?.data === authState.userId) {
    editable = true;
  }

  const [edit, setEdit] = useState(false);

  // const handleEdit = () => {
  //   setEdit(!edit);
  //   // TODO: send team info to api
  //   fetch(`https://api.hacktues.bg/api/team/update/${teamId}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(team),
  //       credentials: "include",
  //     })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);

  //       if (data.status === 200) {
  //         setTeam(data.data);
  //         setEdit(false);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    if (teamData?.data) {
      setTeam(teamData?.data);
    }
  }, [teamData]);

  if (!team) return <div>loading...</div>;

  return (
    <div className={style.page}>
      <div className={style.page_top}>
        <TeamInfo
          team={team}
          setTeam={setTeam}
          edit={edit}
          setEdit={setEdit}
          isEditable={editable}
          teamId={teamId}
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
