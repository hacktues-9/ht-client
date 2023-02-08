import useSWR from "swr";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { TbBell, TbBellRinging, TbCheck, TbX } from "react-icons/tb";

import { useOutsideAlerter } from "./useOutsideAlerter";

import navbar from "../../styles/Navbar.module.scss";

const fetcher = async (url) =>
  await fetch(url, { credentials: "include" })
    .then((r) => r.json())
    .catch((err) => {
      throw err;
    });

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownButtonRef = useRef(null);
  const dropdownRef = useRef(null);

  // get notifications from API

  const { data: numberOfNotifications, error: error } = useSWR(
    `https://api.hacktues.bg/api/user/notifications`,
    fetcher
  );

  useEffect(() => {
    if (numberOfNotifications) {
      console.log("numberOfNotifications", numberOfNotifications);
      setNotifications(numberOfNotifications.data);
    }
  }, [numberOfNotifications]);

  // dropdown menu with profile picture and name
  // and logout button

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClicked = () => {
    setShowDropdown(false);
  };

  const handleAccept = (teamId) => {
    fetch(`https://api.hacktues.bg/api/team/accept/${teamId}/${userId}`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setNotifications(
            notifications.filter(
              (notification) => notification.teamId !== teamId
            )
          );
        } else {
          throw new Error("Error accepting invite", { cause: data });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDecline = (teamId) => {
    fetch(`https://api.hacktues.bg/api/team/decline/${teamId}/${userId}`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setNotifications(
            notifications.filter(
              (notification) => notification.teamId !== teamId
            )
          );
        } else {
          throw new Error("Error declining invite", { cause: data });
        }
      })
      .catch((err) => console.log(err));
  };

  useOutsideAlerter(dropdownRef, dropdownButtonRef, handleClicked);

  if (error) return null;
  //if (!notifications) return null;

  return (
    <>
      <div
        style={{
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className={navbar.notifications}
          onClick={handleDropdown}
          ref={dropdownButtonRef}
        >
          {!notifications || notifications.length === 0 ? (
            <TbBell size={24} />
          ) : (
            <>
              <TbBellRinging size={24} />
              {notifications.length}
            </>
          )}
        </div>
      </div>

      {/* add handleClickOutside */}
      {showDropdown && (
        <div
          className={navbar.dropdown + " " + navbar.notificationsDropdown}
          style={{
            width: "24rem",
          }}
          ref={dropdownRef}
        >
          {!notifications || notifications.length === 0 ? (
            <p>нещо е празно тук :(</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.teamName}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <Image
                    src={notification.teamLogo}
                    alt={"Team Logo"}
                    width={36}
                    height={36}
                    style={{
                      borderRadius: "50%",
                      border: "1px solid rgba(171, 171, 171, 0.415)",
                    }}
                  />
                  <p>{notification.teamName}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <button
                    onClick={() => handleAccept(notification.teamId)}
                    style={{
                      position: "relative",
                      width: "2.5rem",
                      height: "2.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  >
                    <TbCheck width={32} height={32} />
                  </button>
                  <button
                    onClick={() => handleDecline(notification.teamId)}
                    style={{
                      position: "relative",
                      width: "2.5rem",
                      height: "2.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  >
                    <TbX width={32} height={32} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Notifications;
