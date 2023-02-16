import Head from "next/head";

import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";

import AuthProvider from "../context/authContext";
import Navigation from "../partials/Navigation/Navigation";
import Footer from "../partials/Footer/Footer";

import { METADATA } from "../constants/arc";

import type { AppProps } from "next/app";

import "../styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href={METADATA.favicon} />
      </Head>
      <AuthProvider>
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
      <Analytics />
    </>
  );
}
