import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";

import TUESTalksNavbar from "../TUESTalks/Navbar";

import navbar from "../../styles/Navbar.module.scss";

const Navigation = () => {
  const router = useRouter();
  const noNav = [
    "/login",
    "/signup",
    "/teams/[teamId]",
    "/teams/create",
    "/teams/[teamId]/project/[projectId]",
    "/teams/[teamId]/project/create",
    "/users/[userId]",
    "/forgot-password",
    "/_error",
  ];

  if (router.pathname.includes("/tuestalks/")) return <TUESTalksNavbar />;

  return (
    router &&
    !noNav.includes(router.pathname) && (
      <nav className={navbar.nav}>
        <ul className={navbar.ul}>
          <Link href="/">
            <li className={navbar.logo}>
              <Image
                src={"/favicon.png"}
                alt={"HackTUES 9 Logo - link to home page"}
                width={36}
                height={36}
              />
            </li>
          </Link>
          <Link href="/timetable">
            <li>програма</li>
          </Link>
          <Link href="/teams">
            <li>отбори</li>
          </Link>
          <Link href="/rankings">
            <li>класация</li>
          </Link>
          <Link href="/themes">
            <li>теми</li>
          </Link>
          <Link href="/mentors">
            <li>ментори</li>
          </Link>
          <Link href="/archive">
            <li>архив</li>
          </Link>
          <Link href="/regulation">
            <li>регламент</li>
          </Link>
          <Link href="/ourteam">
            <li>нашият екип</li>
          </Link>
          <Link href="/tuestalks">
            <li>TUES Talks</li>
          </Link>
          <Link href="/tinder">
            <li>tinder</li>
          </Link>
          <Link href="/login">
            <li>влез</li>
          </Link>
          <Link href="/signup">
            <li>регистрация</li>
          </Link>
        </ul>
      </nav>
    )
  );
};

export default Navigation;
