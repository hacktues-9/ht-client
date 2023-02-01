import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";

import {
  MouseEventHandler,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

import TUESTalksNavbar from "../TUESTalks/Navbar";

import { TbMenu2 } from "react-icons/tb";
import { useAuthContext } from "../../context/authContext";
import navbar from "../../styles/Navbar.module.scss";
import { useOutsideAlerter } from "./useOutsideAlerter";

import useSWR from "swr";
import Notifications from "./Notifications";

const fetcher = (url) =>
  fetch(url, { credentials: "include" }).then((r) => r.json());

const Profile = ({ userId }) => {
  // get profile picture and name from api
  const {
    data: user,
    mutate,
    error: errUser,
  } = useSWR(`https://api.hacktues.bg/api/user/get/${userId}`, fetcher);
  const { data: team, error: teamError } = useSWR(
    () => `https://api.hacktues.bg/api/team/${userId}`,
    fetcher
  );

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
        <p>{user.firstName}</p>
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
            профил
          </Link>
          {team && team.status === "200" ? (
            <Link href={`/teams/${team?.data}`} onClick={handleClicked}>
              отбор
            </Link>
          ) : (
            <Link href={`/teams/create`} onClick={handleClicked}>
              създай отбор
            </Link>
          )}
          {!team && (
            <Link href={``} onClick={handleClicked}>
              покани
            </Link>
          )}
          <button
            onClick={() => {
              handleClicked();
              fetch("https://api.hacktues.bg/api/auth/logout", {
                method: "POST",
                credentials: "include",
              }).then(() => {
                window.location.reload();
              });
            }}
          >
            изход
          </button>
        </div>
      )}
    </>
  );
};

const DesktopBar = () => {
  return <div>Desktop</div>;
};

// eslint-disable-next-line react/display-name
const MobileBar = forwardRef<HTMLDivElement>(
  (props: { handleMobileDropdownClicked: MouseEventHandler }, ref) => {
    const handleMobileDropdownClicked = props.handleMobileDropdownClicked;

    return (
      <div className={navbar.mobile_dropdown}>
        <div className={navbar.mobile_dropdown_content} ref={ref}>
          <Link href="/teams" onClick={handleMobileDropdownClicked}>
            <li>отбори</li>
          </Link>
          <Link href="/mentors" onClick={handleMobileDropdownClicked}>
            <li>ментори</li>
          </Link>
          <Link href="/themes" onClick={handleMobileDropdownClicked}>
            <li>теми</li>
          </Link>
          <Link href="/timetable" onClick={handleMobileDropdownClicked}>
            <li>програма</li>
          </Link>
          <Link href="/archive" onClick={handleMobileDropdownClicked}>
            <li>архив</li>
          </Link>
          <Link href="/regulation" onClick={handleMobileDropdownClicked}>
            <li>регламент</li>
          </Link>
          <Link href="/ourteam" onClick={handleMobileDropdownClicked}>
            <li>нашият екип</li>
          </Link>
          <Link href="/rankings" onClick={handleMobileDropdownClicked}>
            <li>класация</li>
          </Link>
          <Link href="/archive" onClick={handleMobileDropdownClicked}>
            <li>архив</li>
          </Link>
          <Link href="/tuestalks" onClick={handleMobileDropdownClicked}>
            <li>tuestalks</li>
          </Link>
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
    "/forgot-password",
    "/_error",
  ];

  const { authState, isUserAuthenticated } = useAuthContext();
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);

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
                <li>отбори</li>
              </Link>
              <Link href="/mentors">
                <li>ментори</li>
              </Link>
              <Link href="/themes">
                <li>теми</li>
              </Link>
              <Link href="/timetable">
                <li>информация</li>
              </Link>
              <Link href="/rankings">
                <li>класация</li>
              </Link>
              {/*             <Link href="/archive">
              <li>архив</li>
            </Link>
            <Link href="/regulation">
              <li>регламент</li>
            </Link>
            <Link href="/ourteam">
              <li>нашият екип</li>
            </Link> */}
              <Link href="/tuestalks">
                <li>TUES Talks</li>
              </Link>
              {isUserAuthenticated && userId && (
                <Link href="/tinder">
                  <li>tinder</li>
                </Link>
              )}
            </div>
            {showMobileDropdown && (
              <MobileBar
                ref={mobileDropdownRef}
                {...{ handleMobileDropdownClicked: handleClicked }}
              />
            )}
            {
              <div className={navbar.right}>
                {isUserAuthenticated && userId ? (
                  <>
                    <Notifications userId={userId} />
                    <Profile userId={userId} />
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <li>влез</li>
                    </Link>
                    <Link href="/signup">
                      <li>регистрация</li>
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
      </div>
    )
  );
};

export default Navigation;
