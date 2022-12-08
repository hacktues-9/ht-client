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
            <Link href="/about">
              <li>програма</li>
            </Link>
            <Link href="/blog">
              <li>отбори</li>
            </Link>
            <Link href="/contact">
              <li>класация</li>
            </Link>
            <Link href="/contact">
              <li>победители</li>
            </Link>
            <Link href="/contact">
              <li>теми</li>
            </Link>
            <Link href="/contact">
              <li>ментори</li>
            </Link>
            <Link href="/contact">
              <li>архив</li>
            </Link>
            <Link href="/contact">
              <li>регламент</li>
            </Link>
            <Link href="/contact">
              <li>за HackTUES 9</li>
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
