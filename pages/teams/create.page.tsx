import Head from "next/head";
import { useEffect, useState } from "react";
import Input from "../../components/form/Input";
import { TITLE } from "../../constants/arc";
import { TECHNOLOGIES } from "../../constants/technologies";

import Image from "next/image";

import { useRouter } from "next/router";
import Select from "react-dropdown-select";
import style from "../../styles/0/teams/Create.module.scss";
import ProtectedRoute from "../../wrappers/ProtectedRoute";
import { TbUserCheck } from "react-icons/tb";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Client side search

const SearchPeople = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (search.length > 0) {
      fetcher(`/api/users/search?search=${search}`)
        .then((res) => {
          // max 3 results
          //setResults(res.slice(0, 3));
          setResults([
            {
              id: 1,
              name: "Иван Петров",
              profilePicture: "https://picsum.photos/200",
              isInvited: false,
            },
            {
              id: 2,
              name: "Петър Георгиев",
              profilePicture: "https://picsum.photos/200",
              isInvited: false,
            },
            {
              id: 3,
              name: "Георги Иванов",
              profilePicture: "https://picsum.photos/200",
              isInvited: true,
            },
          ]);
        })
        .catch((err) => {
          console.log(err);
          // test
          /*           setResults([
            {
              id: 1,
              name: "Иван Петров",
              profilePicture: "https://picsum.photos/200",
              isInvited: false,
            },
            {
              id: 2,
              name: "Петър Георгиев",
              profilePicture: "https://picsum.photos/200",
              isInvited: false,
            },
            {
              id: 3,
              name: "Георги Иванов",
              profilePicture: "https://picsum.photos/200",
              isInvited: true,
            },
          ]); */
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
                    src={result.profilePicture}
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

const InviteTeammates = () => {
  return (
    <>
      <SearchPeople />
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
  const [form, setForm] = useState({
    teamName: "",
    teamDescription: "",
    teamTechnologies: [],
  });

  const router = useRouter();

  const returnBack = () => {
    router && router.back();
  };

  return (
    <>
      <Head>
        <title>Създай отбор | {TITLE}</title>
      </Head>
      <div>
        <form className={style.form}>
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
                  values={form.teamTechnologies}
                  onChange={(e) => setForm({ ...form, teamTechnologies: e })}
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
              <InviteTeammates />
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
