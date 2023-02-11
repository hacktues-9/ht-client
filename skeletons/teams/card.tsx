import { useEffect, useState } from "react";
import styles from "../../styles/0/teams/Teams.module.scss";

const TeamCardSkeleton = () => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <div className={styles.card + " " + styles.card_skeleton}>
      <div className={styles.card_header}>
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            backgroundColor: "#e0e0e0",
            opacity: 0.5,
            marginRight: "1rem",
          }}
        />
        <div>
          <div
            style={{
              width: `${Math.floor(Math.random() * 5) + 5}rem`,
              height: "1.5rem",
              backgroundColor: "#e0e0e0",
              borderRadius: "0.25rem",
              marginBottom: "0.5rem",
              opacity: 0.5,
            }}
          />
          {/* <p>{project.name}</p> */}
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
          {Array(Math.floor(Math.random() * 3) + 3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                style={{
                  width: "2.3rem",
                  height: "2.3rem",
                  borderRadius: "50%",
                  backgroundColor: "#e0e0e0",
                  opacity: 0.5,
                }}
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
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: `${Math.floor(Math.random() * 4) + 2.5}rem`,
                    height: "1.5rem",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "0.25rem",
                    opacity: 0.5,
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCardSkeleton;
