import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

import type { AppProps } from "next/app";

import AuthProvider from "../context/authContext";


import "../styles/globals.scss";
import Navigation from "../partials/Navigation/Navigation";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <>
      <AuthProvider>
        <Navigation />
        <Component {...pageProps} />
      </AuthProvider>
      <Analytics />
    </>
  );
}
