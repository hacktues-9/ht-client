import Link from "next/link";

import Head from "next/head";
import style from "./style.module.scss";

const RANKINGS = [
  {
    place: 12,
    name: "Exotic Whip",
    id: 86,
  },
  {
    place: 3,
    name: "Баладжинатор",
    id: 40,
  },
  {
    place: 14,
    name: '"team_name" undefined',
    id: 30,
  },
  {
    place: 8,
    name: "TtT",
    id: 24,
  },
  {
    place: 9,
    name: "443",
    id: 55,
  },
  {
    place: 13,
    name: "Лостаджиите",
    id: 48,
  },
  {
    place: 2,
    name: "False Positive",
    id: 2,
  },
  {
    place: 7,
    name: "Жълта картина с котка",
    id: 44,
  },
  {
    place: 11,
    name: "the chu",
    id: 18,
  },
  {
    place: 4,
    name: "StanaGreshka",
    id: 87,
  },
  {
    place: 5,
    name: "113",
    id: 56,
  },
  {
    place: 6,
    name: "Екзотични",
    id: 22,
  },
  {
    place: 1,
    name: "4090",
    id: 11,
  },
  {
    place: 10,
    name: "AdvancedBegginersGuide",
    id: 69,
  },
];

const SEMIFINALS = [
  {
    name: 1,
    teams: [
      {
        id: 11,
        name: "4090",
        points: 4.2,
      },
      {
        id: 36,
        name: "Boberovo ezero",
        points: 2.55,
      },
      {
        id: 35,
        name: "Ohio",
        points: 2.15,
      },
      {
        id: 16,
        name: "Cope Overflow",
        points: 3.35,
      },
      {
        id: 3,
        name: "TariCAD sistema",
        points: 2,
      },
      {
        id: 69,
        name: "AdvancedBegginersGuide",
        points: 3.55,
      },
      {
        id: 39,
        name: "VLAN",
        points: 3,
      },
      {
        id: 17,
        name: "гъски с ръце",
        points: 3.3,
      },
      {
        id: 20,
        name: "Pupe6",
        points: 2.25,
      },
    ],
  },
  {
    name: 2,
    teams: [
      {
        id: 65,
        name: "ekran 7mici",
        points: 1.4,
      },
      {
        id: 26,
        name: "cow power noobies",
        points: 3.35,
      },
      {
        id: 15,
        name: "KvoT TakoA",
        points: 2.25,
      },
      {
        id: 9,
        name: "Fatcat",
        points: 3.2,
      },
      {
        id: 24,
        name: "TtT",
        points: 4.1,
      },
      {
        id: 86,
        name: "Exotic Whip",
        points: 4.25,
      },
      {
        id: 79,
        name: "комисар Иван Арабаджиев",
        points: 2.45,
      },
      {
        id: 10,
        name: "404: Not Found",
        points: 2.75,
      },
      {
        id: 72,
        name: "Sector C",
        points: 2.65,
      },
    ],
  },
  {
    name: 3,
    teams: [
      {
        id: 66,
        name: "120metra",
        points: 3.25,
      },
      {
        id: 41,
        name: "Chervenata shapchica",
        points: 2.55,
      },
      {
        id: 5,
        name: "Държавниците",
        points: 2.35,
      },
      {
        id: 83,
        name: "Dooobre",
        points: 2,
      },
      {
        id: 18,
        name: "the chu",
        points: 3.9,
      },
      {
        id: 45,
        name: "AS²AP",
        points: 3.25,
      },
      {
        id: 57,
        name: "кой как се уреди",
        points: 2.4,
      },
      {
        id: 30,
        name: '"team_name" undefined',
        points: 4.1,
      },
      {
        id: 14,
        name: "RealEngine",
        points: 3.65,
      },
    ],
  },
  {
    name: 4,
    teams: [
      {
        id: 47,
        name: "bisi",
        points: 3,
      },
      {
        id: 63,
        name: "Insert Team Name Here",
        points: 2.75,
      },
      {
        id: 43,
        name: "Първолаците",
        points: 2.6,
      },
      {
        id: 34,
        name: "Retro Mafia",
        points: 3.25,
      },
      {
        id: 55,
        name: "443",
        points: 4.3,
      },
      {
        id: 59,
        name: "peperudki",
        points: 2.85,
      },
      {
        id: 88,
        name: "Unlocked isolation",
        points: 2.45,
      },
      {
        id: 82,
        name: "Murdaboyz",
        points: 2.55,
      },
      {
        id: 87,
        name: "StanaGreshka",
        points: 3.8,
      },
    ],
  },
  {
    name: 5,
    teams: [
      {
        id: 51,
        name: "ChechnyaStoneLifters",
        points: 3.15,
      },
      {
        id: 56,
        name: "113",
        points: 3.6,
      },
      {
        id: 7,
        name: "6rek",
        points: 3.15,
      },
      {
        id: 58,
        name: "PR masterite",
        points: 2.8,
      },
      {
        id: 48,
        name: "Лостаджиите",
        points: 3.7,
      },
      {
        id: 6,
        name: "Индивидите",
        points: 3.35,
      },
      {
        id: 74,
        name: "Otboronio",
        points: 3.05,
      },
      {
        id: 53,
        name: "S.I.M.P",
        points: 3.2,
      },
      {
        id: 46,
        name: "Nqq griji be men",
        points: 2.8,
      },
    ],
  },
  {
    name: 6,
    teams: [
      {
        id: 32,
        name: "2loops",
        points: 2.5,
      },
      {
        id: 12,
        name: "Dream team",
        points: 2.15,
      },
      {
        id: 22,
        name: "Екзотични",
        points: 4.15,
      },
      {
        id: 68,
        name: "Hustle brigada",
        points: 3.05,
      },
      {
        id: 19,
        name: "c plis plqs",
        points: 3.7,
      },
      {
        id: 2,
        name: "False Positive",
        points: 4.95,
      },
      {
        id: 85,
        name: "bobcat",
        points: 2.65,
      },
      {
        id: 8,
        name: "Zaloopenite",
        points: 3.7,
      },
      {
        id: 73,
        name: "жаба с крик и светещ кон.",
        points: 3.7,
      },
    ],
  },
  {
    name: 7,
    teams: [
      {
        id: 52,
        name: "AASquad",
        points: 3.4,
      },
      {
        id: 70,
        name: "Heisenberg",
        points: 2.85,
      },
      {
        id: 31,
        name: "Кехлибаровци",
        points: 3.35,
      },
      {
        id: 50,
        name: "Memelitrix",
        points: 3.95,
      },
      {
        id: 40,
        name: "Баладжинатор",
        points: 4.7,
      },
      {
        id: 28,
        name: "Janes Romanes Yes Yes Yes",
        points: 2.65,
      },
      {
        id: 27,
        name: "C--",
        points: 3.6,
      },
      {
        id: 23,
        name: "C_e_za_dinozavri",
        points: 3,
      },
      {
        id: 44,
        name: "Жълта картина с котка",
        points: 4.05,
      },
    ],
  },
];

const Rankings = () => {
  return (
    <>
      <Head>
        <title>Класация | HackTUES 9</title>
      </Head>
      <div className={style.rankings}>
        <h1 className={style.rankings_title}>Класация на финали</h1>
        <div className={style.rankings_container}>
          <ul>
            {/* sort by place  */}
            {RANKINGS.sort((a, b) => a.place - b.place).map(
              (team) =>
                team.place !== 0 && (
                  <li key={team.id}>
                    <Link href={`/teams/${team.id}`}>
                      <p>{team.name}</p>
                      <p
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          padding: "0.5rem",
                          width: "3rem",
                          height: "3rem",
                          aspectRatio: "1/1",
                          textAlign: "center",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        {team.place}
                      </p>
                    </Link>
                  </li>
                )
            )}
          </ul>
        </div>
        <h1 className={style.rankings_title}>Класация на полуфинали</h1>
        <div className={style.rankings_semifinals}>
          {SEMIFINALS.map((group) => (
            <ul key={group.name}>
              <h2>Полуфинал {group.name}</h2>
              {group.teams
                .sort((a, b) => b.points - a.points)
                .map((team) => (
                  <li key={team.id}>
                    <Link href={`/teams/${team.id}`}
                    style={{
                      padding: "0.5rem 1rem",
                    }}>
                      <p style={{
                        fontSize: "1rem",
                      }}>{team.name}</p>
                      <p
                        style={{
                          fontSize: "1rem",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          padding: "0.5rem 1rem",
                          height: "2rem",
                          width: "5rem",
                          aspectRatio: "2/5",
                          textAlign: "center",
                          borderRadius: "0.5rem",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        {team.points}
                      </p>
                    </Link>
                  </li>
                ))}
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};

export default Rankings;
