import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

import { useRouter } from "next/router";
import {
  MouseEventHandler,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { TbMenu2 } from "react-icons/tb";

import TUESTalksNavbar from "../TUESTalks/Navbar";
import Notifications from "./Notifications";

import { useAuthContext } from "../../context/authContext";
import { useOutsideAlerter } from "./useOutsideAlerter";

import navbar from "../../styles/Navbar.module.scss";

const fetcher = (url) =>
  fetch(url, { credentials: "include" }).then((r) => r.json());

const Profile = ({ userId, showDropdown, setShowDropdown }) => {
  // get profile picture and name from api
  const {
    data: user,
    mutate,
    error: errUser,
  } = useSWR(`https://api.hacktues.bg/api/user/get/${userId}`, fetcher);
  const { data: team } = useSWR(
    () => `https://api.hacktues.bg/api/team/${userId}`,
    fetcher
  );

  const dropdownButtonRef = useRef(null);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // dropdown menu with profile picture and name
  // and logout button

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClicked = () => {
    setShowDropdown(false);
  };

  useOutsideAlerter(dropdownRef, dropdownButtonRef, handleClicked);

  // fix after login / signup / logout
  useEffect(() => {
    if (!userId) {
      setShowDropdown(false);
    }

    // refetch user data
    if (userId) {
      mutate();
    }
  }, [userId]);

  if (errUser) return <div>failed to load</div>;
  if (!user) return <div>loading...</div>;

  return (
    <>
      <div
        className={
          !showDropdown
            ? navbar.profile
            : navbar.profile + " " + navbar.profile_active
        }
        onClick={handleDropdown}
        ref={dropdownButtonRef}
      >
        <p className={navbar.name}>{user.firstName}</p>
        <Image
          src={user.profilePicture}
          alt={"Profile Picture"}
          width={36}
          height={36}
          style={{
            borderRadius: "50%",
            border: "1px solid rgba(171, 171, 171, 0.415)",
          }}
        />
      </div>

      {/* add handleClickOutside */}
      {showDropdown && (
        <div className={navbar.dropdown} ref={dropdownRef}>
          <Link href={`/user/${userId}`} onClick={handleClicked}>
            Профил
          </Link>
          {team && team?.status === 200 && team?.data !== 0 ? (
            <Link href={`/teams/${team?.data}`} onClick={handleClicked}>
              Отбор
            </Link>
          ) : (
/*             <Link href={`/teams/create`} onClick={handleClicked}>
              Създай отбор
            </Link> */
          )}
          {!team && (
            <Link href={``} onClick={handleClicked}>
              Покани
            </Link>
          )}
          <button
            onClick={() => {
              handleClicked();
              fetch("https://api.hacktues.bg/api/auth/logout", {
                method: "POST",
                credentials: "include",
              }).then(() => {
                router.push("/").then(() => {
                  window.location.reload();
                });
              });
            }}
          >
            Изход
          </button>
        </div>
      )}
    </>
  );
};

const Information = ({ showDropdown, setShowDropdown }) => {
  const dropdownButtonRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClicked = () => {
    setShowDropdown(false);
  };

  useOutsideAlerter(dropdownRef, dropdownButtonRef, handleClicked);

  return (
    <>
      <li
        className={
          !showDropdown
            ? navbar.information
            : navbar.information + " " + navbar.information_active
        }
        onClick={handleDropdown}
        ref={dropdownButtonRef}
        style={{
          position: "relative",
        }}
      >
        <p
          style={{
            margin: "0",
          }}
        >
          Информация
        </p>
        {showDropdown && (
          <div
            className={navbar.dropdown}
            ref={dropdownRef}
            style={{
              left: "-2rem",
              right: "auto",
              top: "3.5rem",
            }}
          >
            <Link href="/ourteam">Нашият екип</Link>
            <Link href="/regulation">Регламент</Link>
            <Link href="/faq">ЧЗВ</Link>
{/*             <Link href="/tuestalks">TUES Talks</Link>
 */}            <Link
              href="/archive"
              style={{
                borderBottom: "none",
              }}
            >
              Архив
            </Link>
          </div>
        )}
      </li>
    </>
  );
};

// eslint-disable-next-line react/display-name
const MobileBar = forwardRef<HTMLDivElement>(
  (
    props: {
      handleMobileDropdownClicked: MouseEventHandler;
      isUserAuthenticated: boolean;
    },
    ref
  ) => {
    const handleMobileDropdownClicked = props.handleMobileDropdownClicked;

    return (
      <div className={navbar.mobile_dropdown}>
        <div className={navbar.mobile_dropdown_content} ref={ref}>
          <Link href="/teams" onClick={handleMobileDropdownClicked}>
            <li>Отбори</li>
          </Link>
{/*           <Link href="/mentors" onClick={handleMobileDropdownClicked}>
            <li>Ментори</li>
          </Link> */}
          <Link href="/themes" onClick={handleMobileDropdownClicked}>
            <li>Теми</li>
          </Link>
{/*           <Link href="/timetable" onClick={handleMobileDropdownClicked}>
            <li>Програма</li>
          </Link> */}
          <Link href="/archive" onClick={handleMobileDropdownClicked}>
            <li>Архив</li>
          </Link>
          <Link href="/regulation" onClick={handleMobileDropdownClicked}>
            <li>Регламент</li>
          </Link>
          <Link href="/ourteam" onClick={handleMobileDropdownClicked}>
            <li>Нашият екип</li>
          </Link>
{/*           <Link href="/rankings" onClick={handleMobileDropdownClicked}>
            <li>Класация</li>
          </Link> */}
          {/*           <Link href="/tuestalks" onClick={handleMobileDropdownClicked}>
            <li>tuestalks</li>
          </Link> */}
          {/* tinder if logged in */}
          {/* login or registration */}
          {!props.isUserAuthenticated && (
            <>
              <Link href="/login" onClick={handleMobileDropdownClicked}>
                <li>Вход</li>
              </Link>
              <Link href="/signup" onClick={handleMobileDropdownClicked}>
                <li>Регистрация</li>
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }
);

const Navigation = () => {
  const router = useRouter();
  const noNav = [
    "/login",
    "/signup",
    "/teams/create",
    "/teams/[teamId]/project/[projectId]",
    "/teams/[teamId]/project/create",
    "/users/",
    "/forgotten-password",
    "/forgotten-password/reset",
    "/_error",
  ];

  const { authState, isUserAuthenticated } = useAuthContext();

  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showInformationDropdown, setShowInformationDropdown] = useState(false);

  const mobileDropdownButtonRef = useRef(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const [userId, setUserId] = useState<string | null>(null);

  const handleMobileDropdown = () => {
    setShowMobileDropdown(!showMobileDropdown);
  };

  const handleClicked = () => {
    setShowMobileDropdown(false);
  };

  useOutsideAlerter(mobileDropdownRef, mobileDropdownButtonRef, handleClicked);

  useEffect(() => {
    if (isUserAuthenticated) {
      setUserId(authState.userId);
    }
  }, [authState.userId, isUserAuthenticated]);

  if (router.pathname.includes("/tuestalks")) return <TUESTalksNavbar />;

  return (
    router &&
    !noNav.includes(router.pathname) && (
      <>
        <div className={navbar.container}>
          <nav className={navbar.nav}>
            <ul className={navbar.ul}>
              <div className={navbar.left}>
                <Link href="/">
                  <li className={navbar.logo}>
                    <Image
                      src={"/favicon.png"}
                      alt={"HackTUES 9 Logo - link to home page"}
                      width={36}
                      height={36}
                      style={{
                        borderRadius: "50%",
                        border: "1px solid rgba(171, 171, 171, 0.415)",
                      }}
                    />
                  </li>
                </Link>
                <Link href="/teams">
                  <li>Отбори</li>
                </Link>
{/*                 <Link href="/mentors">
                  <li>Ментори</li>
                </Link> */}
                <Link href="/themes">
                  <li>Теми</li>
                </Link>
{/*                 <Link href="/timetable">
                  <li>Програма</li>
                </Link> */}
                <Information
                  showDropdown={showInformationDropdown}
                  setShowDropdown={setShowInformationDropdown}
                />
                {/*                 <Link href="/rankings">
                  <li>Класация</li>
                </Link> */}
                {/* 
              {isUserAuthenticated && userId && (
                <Link href="/tinder">
                  <li>tinder</li>
                </Link>
              )} */}
              </div>
              {
                <div className={navbar.right}>
                  {isUserAuthenticated && userId ? (
                    <>
                      <Notifications userId={userId} />
                      <Profile
                        userId={userId}
                        showDropdown={showProfileDropdown}
                        setShowDropdown={setShowProfileDropdown}
                      />
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <li>Влез</li>
                      </Link>
                      <Link href="/signup">
                        <li>Регистрация</li>
                      </Link>
                    </>
                  )}
                  {
                    // hamburger menu
                    <li
                      className={navbar.hamburger_button}
                      onClick={handleMobileDropdown}
                      ref={mobileDropdownButtonRef}
                    >
                      <div>
                        <TbMenu2 className={navbar.hamburger_icon} />
                      </div>
                    </li>
                  }
                </div>
              }
            </ul>
          </nav>
          {showMobileDropdown && (
            <MobileBar
              ref={mobileDropdownRef}
              {...{
                handleMobileDropdownClicked: handleClicked,
                isUserAuthenticated: isUserAuthenticated(),
              }}
            />
          )}
        </div>
      </>
    )
  );
};

export default Navigation;
