// 4:00 - 14:15    Exotic Whip
// 14:18 - 14:33    Баладжинатор
// 14:36 - 14:51    "team_name" undefined
// 14:54 - 15:09    TtT
// 15:12 - 15:27    443
// 15:33 - 15:48    Лостаджиите
// 15:51 - 16:06    False Positive
// 16:12 - 16:27    Жълта картина с котка
// почивка и кетъринг
// 16:30 - 16:45    the chu
// 16:48 - 17:03    StanaGreshka
// 17:06 - 17:21    113
// 17:24 - 17:39    Екзотични
// 17:42 - 17:57    4090
// 18:00 - 18:15    AdvancedBegginersGuide

import Link from "next/link";

import style from "./style.module.scss";
import Head from "next/head";

const RANKINGS = [
  {
    place: 0,
    name: "Exotic Whip",
    id: 86,
  },
  {
    place: 0,
    name: "Баладжинатор",
    id: 40,
  },
  {
    place: 0,
    name: '"team_name" undefined',
    id: 30,
  },
  {
    place: 0,
    name: "TtT",
    id: 24,
  },
  {
    place: 0,
    name: "443",
    id: 55,
  },
  {
    place: 0,
    name: "Лостаджиите",
    id: 48,
  },
  {
    place: 0,
    name: "False Positive",
    id: 2,
  },
  {
    place: 0,
    name: "Жълта картина с котка",
    id: 44,
  },
  {
    place: 0,
    name: "the chu",
    id: 18,
  },
  {
    place: 0,
    name: "StanaGreshka",
    id: 87,
  },
  {
    place: 0,
    name: "113",
    id: 56,
  },
  {
    place: 0,
    name: "Екзотични",
    id: 22,
  },
  {
    place: 0,
    name: "4090",
    id: 11,
  },
  {
    place: 0,
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
        <h1 className={style.rankings_title}>Rankings</h1>
        <div className={style.rankings_container}>
          <ul>
            {RANKINGS.map((team) => (
              <li key={team.id}>
                <Link href={`/teams/${team.id}`}>
                  <p>{team.name}</p>
                  <p style={{
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
                  }}>{team.place}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Rankings;
