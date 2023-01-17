import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

import type { AppProps } from "next/app";

import AuthProvider from "../context/authContext";

import navbar from "../styles/Navbar.module.scss";

import "../styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noNav = ["/login", "/signup", "/forgot-password", "/_error"];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <>
      <AuthProvider>
        {router && !noNav.includes(router.pathname) && (
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
        )}
        <Component {...pageProps} />
      </AuthProvider>
      <Analytics />
    </>
  );
}
