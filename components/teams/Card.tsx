import { useState } from "react";
import styles from "../../styles/0/teams/Teams.module.scss";

import Image from "next/image";
import Technologies from "../technologies/Technologies";
import Link from "next/link";

const TeamCard = ({ team, showMemberInfoCard, setShowMemberInfoCard }) => {
  const { name, logo, members, project, technologies } = team;

  const onHoverMember = (e, member) => {
    // on hover for 0.5s show the member's little info card - name, profile picture, role, class, discord and github
    // MmmberInfoCard
    // stop propagation
    if (showMemberInfoCard.show) return;

    e.stopPropagation();

    // calculate the position of the card - doen't work when the page is scrolled
    const { x, y } = e.target.getBoundingClientRect();
    // eslint-disable-next-line
    const { width, height } = e.target.getBoundingClientRect();

    // fix for scrolling
    const { scrollX, scrollY } = window;

    // set the position of the card
    // set the member's info
    // show the card

    // calculate the position of the card
    // fix for scrolling

    let { posX, posY } = {
      posX: x + width / 2 + scrollX,
      posY: y + width / 2 + scrollY,
    };

    // fix for card out of screen - card width is 320px
    if (posX + 320 > window.innerWidth) {
      posX = x - 320 + width / 2 + scrollX;
    }

    const id = setTimeout(() => {
      setShowMemberInfoCard({
        show: true,
        member,
        position: { x: posX, y: posY },
      });
    }, 500);

    // stop the timeout if the mouse leaves the member's profile picture
    e.target.addEventListener("mouseleave", () => {
      clearTimeout(id);
      setShowMemberInfoCard({
        show: false,
        member: null,
        position: { x: 0, y: 0 },
      });
    });
  };

  if(!team) return null

  return (
    <Link
      className={styles.card}
      href={`/teams/${team.id}`}
    >
      <div className={styles.card_header}>
        <Image width={64} height={64} src={logo} alt={"logo"} />
        <div>
          <h3>{name}</h3>
          <p>{project.name}</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div className={styles.members}>
          {members.map((member) => (
            <Image
              key={member.id}
              src={member.profile_picture}
              alt="profile"
              className="w-10 h-10 rounded-full"
              onMouseEnter={(e) => onHoverMember(e, member)}
              width={64}
              height={64}
              //onMouseLeave={onLeaveMember}
            />
          ))}
        </div>
        <div
          style={{
            marginBottom: "0rem",
            minHeight: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              gap: ".25rem",
              overflow: "hidden",
            }}
          >
            {
              // limit to fit in the card
              technologies &&
                technologies
                  .slice(0, 3)
                  .map((tech) => (
                    <Technologies key={tech.id} technology={tech} />
                  ))
            }
            {technologies && technologies.length === 0 && (
              <p
                style={{
                  margin: "auto auto",
                }}
              >
                няма технологии :(
              </p>
            )}
            {
              // show how many more technologies are there in number
              technologies && technologies.length > 3 && (
                <Technologies technology={`+${technologies.length - 3}`} />
              )
            }
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TeamCard;
