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

const Rankings = () => {
  return (
    <>
      <Head>
        <title>Класация</title>
      </Head>
      <div className={style.rankings}>
        <h1 className={style.rankings_title}>Класация</h1>
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
      </div>
    </>
  );
};

export default Rankings;
