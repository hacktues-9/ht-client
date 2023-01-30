import Link from "next/link";
import { useRef, useState } from "react";
import { useOutsideAlerter } from "./useOutsideAlerter";

import useSWR from "swr";

import Image from "next/image";
import { useRouter } from "next/router";
import navbar from "../../styles/Navbar.module.scss";
import { TbBell, TbBellRinging, TbCheck, TbX } from "react-icons/tb";

const fetcher = (url) =>
  fetch(url, { credentials: "include" }).then((r) => r.json());

const Notifications = ({ userId }) => {
  // TODO: Get notifications (invites) for current user
  // TODO: Display ping on notification bell icon if there are any notifications
  // TODO: Display notifications in dropdown menu on click (they should contain the team name and the team's logo)
  // TODO: Accept or decline invite - buttons in dropdown menu

  const [notifications, setNotifications] = useState([
    {
      teamId: 1,
      teamName: "Team 1",
      teamLogo: "https://api.hacktues.bg/api/team/logo/1",
    },
    {
      teamId: 2,
      teamName: "Team 2",
      teamLogo: "https://api.hacktues.bg/api/team/logo/2",
    },
    {
      teamId: 3,
      teamName: "Team 3",
      teamLogo: "https://api.hacktues.bg/api/team/logo/3",
    },
  ]);

  const { data: numberOfNotifications, error: errNumberOfNotifications } =
    useSWR(`https://api.hacktues.bg/api/notifications/${userId}`, fetcher);

  /*   const { data: notifications, error: errNotifications } = useSWR(
    `https://api.hacktues.bg/api/notifications/${userId}`,
    fetcher
  ); */

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownButtonRef = useRef(null);
  const dropdownRef = useRef(null);

  // dropdown menu with profile picture and name
  // and logout button

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClicked = () => {
    setShowDropdown(false);
  };

  const handleAccept = (teamId) => {
    console.log("Accept invite for team " + teamId);
    // TODO: Send request to API to accept invite
    // remove notification from dropdown menu
    setNotifications(
      notifications.filter((notification) => notification.teamId !== teamId)
    );
  };

  const handleDecline = (teamId) => {
    console.log("Decline invite for team " + teamId);
    // TODO: Send request to API to decline invite
    // remove notification from dropdown menu
    setNotifications(
      notifications.filter((notification) => notification.teamId !== teamId)
    );
  };

  useOutsideAlerter(dropdownRef, dropdownButtonRef, handleClicked);

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
          className={navbar.dropdown}
          style={{
            width: "24rem",
          }}
          ref={dropdownRef}
        >
          {!notifications || notifications.length === 0 ? (
            <p>No notifications</p>
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
