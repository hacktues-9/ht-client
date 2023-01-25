import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";

import TUESTalksNavbar from "../TUESTalks/Navbar";

import { useAuthContext } from "../../context/authContext";

import { forwardRef, useRef, useState } from "react";
import navbar from "../../styles/Navbar.module.scss";
import { useOutsideAlerter } from "./useOutsideAlerter";
import { TbMenu, TbMenu2 } from "react-icons/tb";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Profile = ({ userId }) => {
  // get profile picture and name from api
  //const { data, error } = useSWR(`/api/users/${userId}`, fetcher); // -> MARTO: za marto
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownButtonRef = useRef(null);
  const dropdownRef = useRef(null);

  //if (error) return <div>failed to load</div>;
  //if (!data) return <div>loading...</div>;
  // use this above in production - za marto

  //const team = useSWR(`/api/teams/${userId}`, fetcher); // or something like this -> marto api
  const team = "team"; // -> MARTO: za marto

  // test data
  const data = {
    name: "Mартин",
    profilePicture: "https://i.imgur.com/0R4Z9X1.jpg",
  };

  // dropdown menu with profile picture and name
  // and logout button

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClicked = () => {
    setShowDropdown(false);
  };

  useOutsideAlerter(dropdownRef, dropdownButtonRef, handleClicked);

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
        <p>{data.name}</p>
        <Image
          src={data.profilePicture}
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
          {team && (
            <Link href={`/teams/${team}`} onClick={handleClicked}>
              отбор
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
              //localStorage.removeItem("authState"); // -> MARTO
              window.location.reload();
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

const MobileBar = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className={navbar.mobile_dropdown}>
      <div className={navbar.mobile_dropdown_content} ref={ref}>
        <Link href="/teams" onClick={props.handleMobileDropdownClicked}>
          <li>отбори</li>
        </Link>
        <Link href="/mentors" onClick={props.handleMobileDropdownClicked}>
          <li>ментори</li>
        </Link>
        <Link href="/themes" onClick={props.handleMobileDropdownClicked}>
          <li>теми</li>
        </Link>
        <Link href="/timetable" onClick={props.handleMobileDropdownClicked}>
          <li>програма</li>
        </Link>
        <Link href="/archive" onClick={props.handleMobileDropdownClicked}>
          <li>архив</li>
        </Link>
        <Link href="/regulation" onClick={props.handleMobileDropdownClicked}>
          <li>регламент</li>
        </Link>
        <Link href="/ourteam" onClick={props.handleMobileDropdownClicked}>
          <li>нашият екип</li>
        </Link>
        <Link href="/rankings" onClick={props.handleMobileDropdownClicked}>
          <li>класация</li>
        </Link>
        <Link href="/archive" onClick={props.handleMobileDropdownClicked}>
          <li>архив</li>
        </Link>
        <Link href="/tuestalks" onClick={props.handleMobileDropdownClicked}>
          <li>tuestalks</li>
        </Link>
      </div>
    </div>
  );
});

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

  const userId = authState?.userId;

  const handleMobileDropdown = () => {
    setShowMobileDropdown(!showMobileDropdown);
  };

  const handleMobileDropdownClicked = () => {
    setShowMobileDropdown(false);
  };

  useOutsideAlerter(
    mobileDropdownRef,
    mobileDropdownButtonRef,
    handleMobileDropdownClicked
  );

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
                <Link href="/tinder" onClick={handleMobileDropdownClicked}>
                  <li>tinder</li>
                </Link>
              )}
            </div>
            {showMobileDropdown && (
              <MobileBar
                handleMobileDropdownClicked={handleMobileDropdownClicked}
                ref={mobileDropdownRef}
              />
            )}
            {
              <div className={navbar.right}>
                {isUserAuthenticated && userId ? (
                  <Profile userId={userId} />
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
