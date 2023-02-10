import Image from "next/image";
import Select from "react-dropdown-select";
import useSWR from "swr";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { TbCrown, TbUserCheck, TbUserPlus, TbUserX, TbX } from "react-icons/tb";

import Input from "../../components/form/Input";

import { useAuthContext } from "../../context/authContext";

import { ROLES } from "../../constants/teams";
import { TECHNOLOGIES } from "../../constants/technologies";

import style from "../../styles/0/teams/Team.module.scss";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

const ConfirmModal = ({ title, action, setConfirm }) => {
  // reference to the modal if outside click is needed
  const modalRef = useRef(null);

  // close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setConfirm({
          title: null,
          action: null,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, setConfirm]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setConfirm({
          title: null,
          action: null,
        });
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setConfirm]);

  return (
    <div className={style.modal}>
      <div className={style.modal_content} ref={modalRef}>
        <h2>{title}</h2>
        <div className={style.modal_buttons}>
          <button
            onClick={() => {
              action();
              setConfirm({
                title: null,
                action: null,
              });
            }}
          >
            Да!
          </button>
          <button
            onClick={() =>
              setConfirm({
                title: null,
                action: null,
              })
            }
          >
            май размислих
          </button>
        </div>
      </div>
    </div>
  );
};

const Technologies = ({ team, setTeam, disabled, isEditable }) => {
  return (
    <div className={style.sel}>
      <label className={style.label} htmlFor="teamTechologies">
        технологии
      </label>
      <Select
        name="teamTechnologies"
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
        placeholder={
          isEditable ? "Изберете технологии" : "Няма избрани технологии"
        }
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

const TeamInfo = ({
  team,
  setTeam,
  edit,
  setEdit,
  isEditable,
  inTeam,
  teamId,
  setConfirm,
}) => {
  const [error, setError] = useState({
    name: null,
    description: null,
    technologies: null,
    profilePicture: null,
    general: null,
  });

  const router = useRouter();

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
            setEdit(false);
          } else {
            setError({
              ...error,
              general: data.error,
            });
          }
        })
        .catch((err) => {
          setError({
            ...error,
            general: "нещо май се обърка :(",
          });
        });
    }
  };

  const handleLeave = () => {
    fetch(`https://api.hacktues.bg/api/team/leave/${teamId}`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          router.push("/teams");
        } else {
          throw new Error("Something went wrong", {
            cause: data.error,
          });
        }
      })
      .catch((err) => {});
  };

  const handleDelete = () => {
    fetch(`https://api.hacktues.bg/api/team/delete/${teamId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          router.push("/teams");
        } else {
          throw new Error("Something went wrong", {
            cause: data.error,
          });
        }
      })
      .catch((err) => {});
  };

  return (
    <div className={style.team_info}>
      <div className={style.team_info_information}>
        <div className={style.team_info_information_header}>
          <Image
            src={team.logo || "/images/team-logo.png"}
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
        <div
          className={style.team_info_information_links}
          style={{
            display: "flex",
          }}
        >
          {/*           {edit ? (
            <>
              <label htmlFor="teamLink">гитгъб</label>
              <input
                type="text"
                name="teamLink"
                id="teamLink"
                value={team.link}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "1.2rem",
                  fontWeight: "400",
                  fontFamily: "inherit",
                  margin: "0",
                  padding: "0",
                  outline: "none",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                onChange={(e) => setTeam({ ...team, link: e.target.value })}
              />
              <label htmlFor="teamLinks">сайт</label>
              <input
                type="text"
                name="teamLinks"
                id="teamLinks"
                value={team.links}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "1.2rem",
                  fontWeight: "400",
                  fontFamily: "inherit",
                  margin: "0",
                  padding: "0",
                  outline: "none",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                onChange={(e) => setTeam({ ...team, links: e.target.value })}
              />
            </>
          ) : (
            <>
              {team.link && team.links && (
                <>
                  <label htmlFor="teamLink">гитгъб</label>
                  <a href={team.link} target="_blank" rel="noreferrer">
                    {team.link}
                  </a>
                  <label htmlFor="teamLinks">сайт</label>
                  <a
                    href="https://hacktues.bg"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {team.links}
                  </a>
                </>
              )}
            </>
          )} */}

          {inTeam ===
            "user in team" /* some logic to see if user is in team */ && (
            <div
              style={{
                margin: "0 0 0 auto",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                gap: "1rem",
              }}
            >
              <button
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  padding: ".5rem 1rem",
                  borderRadius: ".5rem",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  fontSize: "1rem",
                }}
                onClick={() =>
                  setConfirm({
                    title: "Сигурен ли си, че искаш да напуснеш 🤔",
                    action: () => handleLeave(),
                  })
                }
              >
                напусни
              </button>
              {isEditable && (
                <button
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    padding: ".5rem 1rem",
                    borderRadius: ".5rem",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    fontSize: "1rem",
                  }}
                  onClick={() =>
                    setConfirm({
                      title: "Сигурен ли си, че искаш да изтриеш отбора си 🤡",
                      action: () => handleDelete(),
                    })
                  }
                >
                  изтрий
                </button>
              )}
            </div>
          )}
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
  fetch(`https://api.hacktues.bg/api/team/invite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      teamId: parseInt(team),
      userId: user,
    }),
    credentials: "include",
  }).then((res) => {
    if (res.status === 200) {
      alert("Поканата е изпратена");
    } else {
    }
  });
};

const SearchPeople = ({ teamId }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [alreadyInvited, setAlreadyInvited] = useState([]);

  useEffect(() => {
    fetcher(`https://api.hacktues.bg/api/team/get/invitees/${teamId}`).then(
      (res) => {
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
        .catch((err) => {});
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
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={result.profile_picture}
                      alt={result.name}
                      width={64}
                      height={64}
                      className={style.person_avatar}
                    />
                    {result.elsys_email_verified && (
                      <img
                        src="/assets/icons/checkmark.svg"
                        alt="потвърден"
                        style={{
                          position: "absolute",
                          top: "-.25rem",
                          right: "0",
                          width: "1rem",
                        }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      marginLeft: "1rem",
                      width: "100%",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: "1rem",
                      }}
                    >
                      {result.name}
                    </p>
                    <p
                      style={{
                        fontSize: ".7rem",
                        margin: 0,
                        marginTop: ".1rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "90%",
                      }}
                    >
                      {"@" + result?.elsys_email?.split("@")[0]}
                    </p>
                  </div>
                </div>
                <button
                  disabled={result.isInvited}
                  type="button"
                  className={style.person_invite}
                  style={{
                    backgroundColor: result.isInvited
                      ? "rgba(0, 0, 0, 0.1)"
                      : "rgba(255, 255, 255, 0.1)",
                    color: result.isInvited
                      ? "rgba(0, 0, 0, 0.5)"
                      : "rgba(255, 255, 255, 0.5)",
                    width: "3rem",
                    height: "3rem",
                    aspectRatio: "1/1",
                  }}
                  onClick={() => {
                    handleInvite(result.id, teamId);
                    result.isInvited = true;
                  }}
                >
                  <TbUserCheck size={28} />
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

const ContextMenu = ({ id, kickMember }) => {
  function makeCaptain(id: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div
      className={style.context_menu}
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "calc(100% + 1rem)",
        right: "0",
        width: "fit-content",
        height: "fit-content",
        borderRadius: "0.5rem",
        padding: "0.5rem",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        zIndex: 1,
      }}
    >
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
        onClick={() => makeCaptain(id)}
      >
        <TbCrown />
        <p>направи капитан</p>
      </button>
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

const TeamMembers = ({ team, setTeam, isEditable, teamId }) => {
  const [isInviting, setIsInviting] = useState(false);
  const [openContextMenu, setOpenContextMenu] = useState(false);

  const kickMember = (id) => {
    fetcher(`https://api.hacktues.bg/api/team/kick/${id}`).then((res) => {
      if (res.status === 200) {
      } else {
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
    //setOpenContextMenu(true);
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
      {isInviting && <SearchPeople teamId={teamId} />}
    </div>
  );
};

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

  return (
    <div
      className={style.project}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      за проект са ти нужни теми първо?
    </div>
  );
};

const Team = () => {
  const router = useRouter();

  const { teamId } = router.query as { teamId: string };
  const { authState } = useAuthContext();

  const [confirm, setConfirm] = useState({
    title: null,
    action: null,
  });
  const [edit, setEdit] = useState(false);

  let editable = false;

  const { data: teamData } = useSWR(
    teamId ? `https://api.hacktues.bg/api/team/get/${teamId}` : null,
    fetcher
  );

  const { data: inTeam } = useSWR(
    authState.isLoggedIn && teamId
      ? `https://api.hacktues.bg/api/team/users/in-team/${teamId}`
      : null,
    fetcher
  );

  const { data: isCaptainResp } = useSWR(
    authState.isLoggedIn && teamId
      ? `https://api.hacktues.bg/api/team/captain/${teamId}`
      : null,
    fetcher
  );

  const [team, setTeam] = useState(teamData?.data);

  if (isCaptainResp?.data === authState.userId) {
    editable = true;
  }

  useEffect(() => {
    if (!teamData) return;

    if (teamData?.data) setTeam(teamData?.data);
  }, [teamData]);

  if (!team || !teamId || !teamData) return <div>loading...</div>;

  return (
    <>
      <div className={style.page}>
        <div className={style.page_top}>
          <TeamInfo
            team={team}
            setTeam={setTeam}
            edit={edit}
            setEdit={setEdit}
            isEditable={editable}
            inTeam={inTeam?.data}
            teamId={teamId}
            setConfirm={setConfirm}
          />
        </div>
        <div className={style.page_bottom}>
          <TeamProject team={team} setTeam={setTeam} isEditable={editable} />
          <TeamMembers
            team={team}
            setTeam={setTeam}
            isEditable={editable}
            teamId={teamId}
          />
        </div>
      </div>
      {confirm.title && (
        <ConfirmModal
          title={confirm.title}
          action={confirm.action}
          setConfirm={setConfirm}
        />
      )}
    </>
  );
};

export default Team;
