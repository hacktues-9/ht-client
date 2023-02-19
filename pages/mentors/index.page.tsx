import Image from "next/image";
import useSwr from "swr";

import styles from "./Mentors.module.scss";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { TECHNOLOGIES } from "../../constants/technologies";
import Technologies from "../../components/technologies/Technologies";

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
  team_id,
  buying,
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
        } else {
          setBuying(false);
          // TODO - Marto Error Handling - if already bought and shit like that
          openModal("Нещо се обърка, опитайте отново!");
        }
      })
      .catch(() => {
        setBuying(false);
        openModal("Нещо се обърка, опитайте отново!");
      });
  };

  return (
    <div className={styles.card}>
      <div className={styles.photo}>
        <img src={profile_picture} alt={name} />
      </div>
      <div className={styles.info}>
        <h2>{name}</h2>
        <p className={styles.possition}>{position}</p>
        <p>{description}</p>
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            margin: "1rem 0",
          }}
        />
        <div>
          {time_frames.map((hour, index) => (
            <p key={index}>
              {hour.day} от {hour.from} до {hour.to}
            </p>
          ))}
        </div>
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            margin: "1rem 0",
          }}
        />
        <div
          style={{
            display: "flex",
            height: "100%",
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
        </div>
      </div>
      {
        team_id == 0 && (
          <>
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                margin: "1rem 0",
              }}
            />
            <div className={styles.actions}>
              <button onClick={()=>{handleBuy(id)}} disabled={buying}>
                запази {online ? "онлайн" : "присъствено"}
              </button>
            </div>
          </>
        )
      }
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
    console.log("Modal Opened")
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
          setCanBuy(data.data === 2);
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
        <div className={styles.searchContainer} >
          <input type="text" placeholder="търси по име или технология" onChange={(e)=>{setSearch(e.target.value)}} />
        </div>
        <div className={styles.mentorsContainer}>
          {mentors?.map((mentor) => (
            <MentorCard
              key={mentor.id}
              {...mentor}
              canBuy={canBuy}
              buying={buying}
              setBuying={setBuying}
              openModal={openModal}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Mentors;
