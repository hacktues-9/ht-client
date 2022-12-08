import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthProvider } from "../context/authContext";
import "../styles/globals.scss";

import navbar from "../styles/Navbar.module.scss";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noNav = ["/login", "/signup", "/forgot-password", "/_error"];

  return (
    <AuthProvider>
      {router && !noNav.includes(router.pathname) && (
        <nav className={navbar.nav}>
          <ul className={navbar.ul}>
            <Link href="/">
              <li>начало</li>
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
  );
}
