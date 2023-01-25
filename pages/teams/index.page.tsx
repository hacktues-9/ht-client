import useSWR from "swr";

import { useRouter } from "next/router";
import TeamCard from "../../components/teams/Card";

import styles from "../../styles/0/teams/Teams.module.scss";
import { TITLE } from "../../constants/arc";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { ROLES } from "../../constants/teams";
import { TbBrandDiscord, TbBrandGithub } from "react-icons/tb";
import { ITeam } from "../../types/ITeam";

const url = "/data/teams.json";
const fetcher = (url: string) => fetch(url, { credentials: "include"}).then((res) => res.json());

const MemberInfoCard = ({ member, position }) => {
  const { name, profilePicture, role, class: class_, discord, github } = member;

  // position is the position of the member's profile picture
  // the card should be positioned relative to the member's profile picture
  // the card should be positioned in the top right corner of the member's profile picture

  return (
    <div
      className={styles.member_info_card}
      style={{ top: position.y, left: position.x, display: "block" }}
    >
      <div className={styles.member_info_card_header}>
        <Image
          width={64}
          height={64}
          src={profilePicture}
          alt={"profile picture"}
        />
        <div>
          <h3>{name}</h3>
          <p>
            {ROLES[role]} · {class_} клас
          </p>
        </div>
      </div>
      <div className={styles.socials}>
        {discord && (
          <a className={styles.social}>
            <TbBrandDiscord size={32} />
            {discord}
          </a>
        )}
        {github && (
          <a className={styles.social}>
            <TbBrandGithub size={32} />
            {github}
          </a>
        )}
      </div>
    </div>
  );
};

const Teams = () => {
  const [showMemberInfoCard, setShowMemberInfoCard] = useState({
    show: false,
    member: null,
    position: { x: 0, y: 0 },
  });

  const { data, isLoading, error } = useSWR("http://localhost:8080/api/team/get", fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const { teams }: { teams: ITeam[] } = data;

  console.log(data)
  return (
    <>
      <Head>
        <title>Отбори | {TITLE}</title>
        <meta name="description" content="Отбори на HackTUES 9" />
        <meta
          name="keywords"
          content="hacktues, hacktues9, hacktues 9, отбори, hacktues отбори, хактуес, хакатон, туес, технологично училище електронни системи, гимназии, технологии, доброволци"
        />
        <meta name="author" content="HackTUES 9" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Bulgarian" />
        <meta name="revisit-after" content="1 days" />
        <meta name="distribution" content="web" />
        <meta name="rating" content="general" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {showMemberInfoCard.show && (
        <MemberInfoCard
          member={showMemberInfoCard.member}
          position={showMemberInfoCard.position}
        />
      )}
      <div className={styles.teams}>
        <div>
          {/* Slider - how many teams out of total number / limit */}
          {/* <p>1/10</p> */}
        </div>
        <ul className={styles.cards_grid}>
          {teams && teams.map((team: ITeam) => (
            <TeamCard
              key={team.id}
              team={team}
              showMemberInfoCard={showMemberInfoCard}
              setShowMemberInfoCard={setShowMemberInfoCard}
            />
          ))}
          
        </ul>
      </div>
    </>
  );
};

// get teams from api

export default Teams;
