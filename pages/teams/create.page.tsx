import Head from "next/head";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Input from "../../components/form/Input";
import { TITLE } from "../../constants/arc";
import { TECHNOLOGIES } from "../../constants/technologies";

import Image from "next/image";
import { useRouter } from "next/router";

import Select from "react-dropdown-select";
import { TbUserCheck } from "react-icons/tb";
import style from "../../styles/0/teams/Create.module.scss";
import ProtectedRoute from "../../wrappers/ProtectedRoute";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

interface formData {
  teamName: string;
  teamDescription: string;
  teamTechnologies: any[];
  teamInvitees: any[];
}

interface functionFormData {
  form: formData;
  setForm: Dispatch<SetStateAction<formData>>;
}

// Client side search

const handleInvite = (
  user: any,
  form: formData,
  setForm: Dispatch<SetStateAction<formData>>
) => {
  if (!user.isInvited) {
    setForm({
      ...form,
      teamInvitees: [...form.teamInvitees, user],
    });
  }
};

const SearchPeople: FunctionComponent<functionFormData> = (
  props: functionFormData
) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (search.length > 0) {
      fetcher(`https://api.hacktues.bg/api/team/users/search?search=${search}`)
        .then((res) => {
          if (res.data) {
            res.data.map((user) => {
              if (
                props.form.teamInvitees.find(
                  (invitee) => invitee.id === user.id
                )
              ) {
                user.isInvited = true;
              }
              return user;
            });
            setResults(res.data);
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
                    handleInvite(result, props.form, props.setForm);
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

const InviteTeammates: FunctionComponent<functionFormData> = (
  props: functionFormData
) => {
  return (
    <>
      <SearchPeople form={props.form} setForm={props.setForm} />
    </>
  );
};

const CreateTeam = () => {
  // if in team redirect to team page
  const [errors, setErrors] = useState({
    teamName: null,
    teamDescription: null,
  });

  const [form, setForm] = useState<formData>({
    teamName: "",
    teamDescription: "",
    teamTechnologies: [],
    teamInvitees: [],
  });
  const [technologies, setTechnologies] = useState([]);

  const router = useRouter();

  const handleTechnologies = (e: any) => {
    setTechnologies(e);
    //go through the array and get the names
    let techs = [];
    e.map((tech) => {
      techs.push(tech.name);
    });
    setForm({
      ...form,
      teamTechnologies: techs,
    });
  };

  const returnBack = () => {
    router && router.back();
  };

  const validateName = async (form, errors) => {
    if (!form.teamName) {
      errors = {
        ...errors,
        teamName: "Моля въведете име на екипа",
      };
    } else if (form.teamName.length < 3) {
      errors = {
        ...errors,
        teamName: "Името на екипа трябва да е поне 3 символа",
      };
    } else if (form.teamName.length > 28) {
      errors = {
        ...errors,
        teamName: "Името на екипа трябва да е по-малко от 28 символа",
      };
    } else {
      errors = {
        ...errors,
        teamName: null,
      };
    }

    return errors;
  };

  const validateDescription = async (form, errors) => {
    if (!form.teamDescription) {
      errors = {
        ...errors,
        teamDescription: "Моля въведете описание на екипа",
      };
    } else if (form.teamDescription.length < 10) {
      errors = {
        ...errors,
        teamDescription: "Описанието на екипа трябва да е поне 10 символа",
      };
    } else if (form.teamDescription.length > 140) {
      errors = {
        ...errors,
        teamDescription:
          "Описанието на екипа трябва да е по-малко от 140 символа",
      };
    } else {
      errors = {
        ...errors,
        teamDescription: null,
      };
    }

    return errors;
  };

  const validateTeam = async (form) => {
    let errors = {
      teamName: null,
      teamDescription: null,
    };

    errors = await validateName(form, errors);
    errors = await validateDescription(form, errors);

    return errors;
  };

  const handleCreateTeam = async (e: any) => {
    e.preventDefault();
    console.log(form);

    const newErrors = await validateTeam(form);
    setErrors(newErrors);
    if (newErrors.teamName || newErrors.teamDescription) {
      return;
    }

    fetch("https://api.hacktues.bg/api/team/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA", data);
        if (data.satatus !== 200) {
          // show error on the page

          // if error is 401 redirect to login
          if (data.status === 401) {
            router.push("/login");
          }

          if (data.status === 403) {
            console.log("ALREADY IN TEAM, pushing to team page", data.teamId);
            // TODO: Marto
            router.push(`/teams/${data.teamId}`);
          }
        } else {
          router.push(`/teams/${data.id}`);
        }
      })
      .catch((err) => {
        console.log(err);
        // show error on the page

        // if error is 401 redirect to login
        if (err.status === 401) {
          router.push("/login");
        }

        if (err.status === 403) {
          router.push(`/teams/${err.teamId}`);
        }
      });
  };

  // TODO: Marto
  // check if user is in team, if so redirect to team page
  useEffect(() => {
    fetch("https://api.hacktues.bg/api/team/check", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA", data);
        if (data.status === 200) {
          if (!data.teamId) {
            console.log("NO TEAM ID");
          } else {
            router.push(`/teams/${data.teamId}`);
          }
        } else {
          console.log("NO TEAM");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Създай отбор | {TITLE}</title>
      </Head>
      <div>
        <form className={style.form} onSubmit={handleCreateTeam}>
          <h1>Създай отбор</h1>
          <div className={style.team}>
            <div className={style.team_info}>
              <Input
                label="име"
                classes={["email"]}
                id="teamName"
                name="teamName"
                type="text"
                placeholder="Лемнистика"
                required={true}
                value={form.teamName}
                onChange={(e) => setForm({ ...form, teamName: e.target.value })}
              />
              {errors.teamName && (
                <p className={style.error}>{errors.teamName}</p>
              )}

              <Input
                label="описание"
                classes={["email"]}
                id="teamDescription"
                name="teamDescription"
                type="textarea"
                placeholder="Лемнистика"
                required={true}
                value={form.teamDescription}
                onChange={(e) =>
                  setForm({ ...form, teamDescription: e.target.value })
                }
              />
              {errors.teamDescription && (
                <p className={style.error}>{errors.teamDescription}</p>
              )}
            </div>

            <div className={style.team_info}>
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
                  values={technologies}
                  onChange={handleTechnologies}
                  className={style.select}
                  placeholder="C++ Java Angular"
                  searchBy="label"
                  searchable={true}
                  multi={true}
                  required={false}
                  keepSelectedInList={true}
                  dropdownHandle={false}
                  debounceDelay={300}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: ".5rem",
                    padding: ".5rem",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    fontSize: "1.2rem",
                    width: "24rem",
                    height: "12rem",
                  }}
                />
              </div>
              <InviteTeammates form={form} setForm={setForm} />
            </div>
          </div>
          <div className={style.buttons}>
            <button
              type="button"
              className={style.form_button}
              onClick={returnBack}
            >
              назад
            </button>
            <button type="submit" className={style.form_button}>
              създай
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const CreateTeamPage = () => (
  <ProtectedRoute>
    <CreateTeam />
  </ProtectedRoute>
);

export default CreateTeamPage;
