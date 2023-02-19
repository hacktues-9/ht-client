import useSwr from "swr";

import { useEffect, useState } from "react";
import Technologies from "../../components/technologies/Technologies";
import { useAuthContext } from "../../context/authContext";
import styles from "./Mentors.module.scss";
import { TIMES } from "../../constants/time";

const fetcher = (url) => fetch(url).then((res) => res.json());

const MentorCard = ({
  id,
  name,
  profile_picture,
  description,
  position,
  technologies,
  time_frames,
  online,
  on_site,
  team_id,
  buying,
  canBuy,
  setCanBuy,
  setBuying,
  openModal,
}) => {
  const handleBuy = (mID) => {
    setBuying(true);

    // TODO: Marto

    fetch(`https://api.hacktues.bg/api/mentor/save/${mID}`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setBuying(false);
          openModal("Успешно запазихте ментора!");
          setCanBuy(false);
        } else {
          setBuying(false);
          if (data.description === "no access token provided") {
            openModal("Не сте влезли в профила си!");
            return;
          } else {
            openModal("Нещо се обърка, опитайте отново!");
          }
        }
      })
      .catch(() => {
        setBuying(false);
        openModal("Нещо се обърка, опитайте отново!");
      });
  };

  return (
    <div className={styles.card}>
      <div
        style={{
          width: "100%",
        }}
      >
        <div className={styles.photo}>
          <img
            src={profile_picture.replace("https://hacktues.bg", "")}
            alt={name}
          />
        </div>
        <h2>{name}</h2>
        <p className={styles.possition}>{position}</p>
        <p className={styles.desc}>{description}</p>
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            margin: ".5rem 0",
          }}
        />
        <ul className={styles.time}>
          {time_frames.sort().map((hour, index) => {
            console.log(hour);
            return (
              <li key={hour - 1}>
                {TIMES[hour - 1].day} от {TIMES[hour - 1].from} до{" "}
                {TIMES[hour - 1].to}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.info}>
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            margin: ".5rem 0",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".25rem",
            overflow: "hidden",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {technologies?.map((tech) => (
            <Technologies key={tech.id} technology={tech} />
          ))}
          {technologies?.length === 0 && <p>Няма технологии</p>}
        </div>
      </div>
      {team_id === 0 && canBuy && (
        <div
          style={{
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              margin: "1rem 0",
            }}
          />
          <div className={styles.actions}>
            <button
              onClick={() => {
                handleBuy(id);
              }}
              disabled={buying}
            >
              запази {online && "онлайн"}
              {online && on_site && " / "}
              {on_site && "на място"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Mentors = () => {
  const { data: resp } = useSwr(
    "https://api.hacktues.bg/api/mentor/get/mentors",
    fetcher
  );

  const [mentors, setMentors] = useState(resp?.data);
  const { authState, isUserAuthenticated } = useAuthContext();
  const [userId, setUserId] = useState<string | null>(null);
  const [canBuy, setCanBuy] = useState<boolean | null>(null);
  const [buying, setBuying] = useState(false);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState({
    open: false,
    message: "",
  });

  // check if user is captain so he can see the buy button
  useEffect(() => {
    if (isUserAuthenticated) {
      setUserId(authState.userId);
    }
  }, [authState.userId, isUserAuthenticated]);

  const openModal = (message: string) => {
    console.log("Modal Opened");
    setModal({
      open: true,
      message,
    });
  };

  useEffect(() => {
    fetch(`https://api.hacktues.bg/api/user/get/role/${userId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          if (data.data === 2) {
            // check if the team has a mentor - // TODO: Marto - 19-02 11:29
            fetch(`https://api.hacktues.bg/api/mentor/get/team/${userId}`, {
              credentials: "include",
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.status === 200) {
                  setCanBuy(false);
                } else {
                  setCanBuy(true);
                }
              })
              .catch((err) => console.log(err));
          }
        } else {
          setCanBuy(false);
        }
      })
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    fetch(`https://api.hacktues.bg/api/mentor/get/mentors?sname=${search}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setMentors(data.data);
        } else {
          setMentors([]);
        }
      })
      .catch((err) => console.log(err));
  }, [search]);

  // if (mentorErr) return <div style={{ marginTop: "50px" }}>failed to load</div>;
  // if (!mentors) return <div style={{ marginTop: "50px" }}>loading...</div>;

  return (
    <>
      <div
        className={styles.modal}
        style={{
          display: modal.open ? "flex" : "none",
        }}
      >
        <div className={styles.modalContent}>
          <p>{modal.message}</p>
          <button onClick={() => setModal({ open: false, message: "" })}>
            Затвори
          </button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="търси по име или технология"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className={styles.mentorsContainer}>
          {mentors?.map((mentor) => {
            if (
              mentor.name === "Мартин Божилов" ||
              mentor.name === "Виктория Димитрова"
            )
              return null;
            return (
              <MentorCard
                key={mentor.id}
                {...mentor}
                canBuy={canBuy}
                setCanBuy={setCanBuy}
                buying={buying}
                setBuying={setBuying}
                openModal={openModal}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Mentors;
