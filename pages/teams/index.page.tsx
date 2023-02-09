import useSWR from "swr";
import Head from "next/head";
import Image from "next/image";

import { useEffect, useState } from "react";
import { TbBrandDiscord, TbBrandGithub } from "react-icons/tb";

import TeamCard from "../../components/teams/Card";

import { TITLE } from "../../constants/arc";
import { ROLES } from "../../constants/teams";
import { ITeam } from "../../types/ITeam";

import styles from "../../styles/0/teams/Teams.module.scss";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

const MemberInfoCard = ({ member, position }) => {
  const {
    name,
    profile_picture,
    role,
    class: class_,
    discord,
    github,
  } = member;

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
          src={profile_picture}
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

const ProgressBar = ({ verified, current, total, loading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress((verified / total) * 100);
  }, [verified, total]);

  // /api/admin/get/teams

  return (
    <div className={styles.progress_bar}>
      <div
        className={styles.progress_bar__progress}
        style={{ width: `${progress}%` }}
      ></div>
      <p>
        {loading ? (
          "взимаме ги..."
        ) : (
          <>
            {verified} / {current - 1} / {total}
          </>
        )}
      </p>
    </div>
  );
};

const Teams = () => {
  const [showMemberInfoCard, setShowMemberInfoCard] = useState({
    show: false,
    member: null,
    position: { x: 0, y: 0 },
  });

  const {
    data: resp,
    isLoading,
    error,
  } = useSWR("https://api.hacktues.bg/api/team/get", fetcher);

  const {
    data: verifiedTeams,
    isLoading: verifiedLoading,
    error: verifiedError,
  } = useSWR("https://api.hacktues.bg/api/admin/get/teams", fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const { data }: { data: ITeam[] } = resp;

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
        {!verifiedError && (
          <ProgressBar
            verified={verifiedTeams?.data}
            current={data?.length || 0}
            total={60}
            loading={verifiedLoading}
          />
        )}
        <ul className={styles.cards_grid}>
          {data &&
            data.map((team: ITeam) => (
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
