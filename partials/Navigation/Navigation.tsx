import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";

import TUESTalksNavbar from "../TUESTalks/Navbar";

import { useAuthContext } from "../../context/authContext";

import { useState } from "react";
import navbar from "../../styles/Navbar.module.scss";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Profile = ({ userId }) => {
  // get profile picture and name from api
  //const { data, error } = useSWR(`/api/users/${userId}`, fetcher); // -> MARTO: za marto
  const [showDropdown, setShowDropdown] = useState(false);

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

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          gap: "1rem",
          position: "relative",
        }}
        onClick={handleDropdown}
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
      {showDropdown && (
        <div className={navbar.dropdown}>
          <Link href={`/user/${userId}`}>профил</Link>
          {team && <Link href={`/teams/${team}`}>отбор</Link>}
          {!team && <Link href={``}>покани</Link>}
          <button onClick={() => {}}>изход</button>
        </div>
      )}
    </>
  );
};

const DesktopBar = () => {
  return <div>Desktop</div>;
};

const MobileBar = () => {
  return <div>Mobile</div>;
};

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
  //const [selected, setSelected] = useState("home");

  const userId = authState?.userId;

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
          </ul>
        </nav>
      </div>
    )
  );
};

export default Navigation;
