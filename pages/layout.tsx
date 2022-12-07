/* eslint-disable @next/next/no-head-element */

import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    // checks if the user is authenticated
    if (!authContext.isUserAuthenticated()) router.push("/login");
  }, []);

  return (
    <html>
      <head></head>
      <body>{children}</body>
    </html>
  );
}
