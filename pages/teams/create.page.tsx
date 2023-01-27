import Head from "next/head";
import { useEffect, useState, Dispatch, SetStateAction, FunctionComponent } from "react";
import Input from "../../components/form/Input";
import { TITLE } from "../../constants/arc";
import { TECHNOLOGIES } from "../../constants/technologies";

import { useRouter } from "next/router";
import Image from "next/image";

import Select from "react-dropdown-select";
import style from "../../styles/0/teams/Create.module.scss";
import ProtectedRoute from "../../wrappers/ProtectedRoute";
import { TbUserCheck } from "react-icons/tb"

const fetcher = (url: string) => fetch(url, {credentials:"include"}).then((res) => res.json());



interface formData {
  teamName: string,
  teamDescription: string,
  teamTechnologies: any[],
  teamInvitees: any[],
}

interface functionFormData {
  form: formData,
  setForm: Dispatch<SetStateAction<formData>>
}

// Client side search

const handleInvite = (user: any, form: formData, setForm: Dispatch<SetStateAction<formData>>) => {
  if (!user.isInvited) {
    setForm({
      ...form,
      teamInvitees: [...form.teamInvitees, user],
    });
  }
};

const SearchPeople : FunctionComponent<functionFormData> = (props : functionFormData) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (search.length > 0) {
      fetcher(`http://localhost:8080/api/team/users/search?search=${search}`)
        .then((res) => {
          if (res){
            res.data.map((user) => {
              if (props.form.teamInvitees.find((invitee) => invitee.id === user.id)) {
                user.isInvited = true;
              }
              return user;
            })
            setResults(res);
          }else{
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
                    handleInvite(result, props.form, props.setForm)
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

const InviteTeammates : FunctionComponent<functionFormData> = (props : functionFormData) => {
  return (
    <>
      <SearchPeople form={props.form} setForm={props.setForm} />
    </>
  );
};

/*



*/

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    //const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled ? "red" : "red",
      // color: '#FFF',
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
};

const CreateTeam = () => {
  // if in team redirect to team page
  const [form, setForm] = useState<formData>({ teamName: "", teamDescription: "", teamTechnologies: [], teamInvitees: [] });
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
  }


  const handleCreateTeam = async (e: any) => {
    e.preventDefault();
    console.log(form);
    const res = await fetch("http://localhost:8080/api/team/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      throw new Error(data.message);
    } else {
      //redirect to team page
      router.push("/team/${data.id}");
      console.log(data.id)
    }
    return data;
    };
  

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
                  required={true}
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