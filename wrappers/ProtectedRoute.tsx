// protected route component for authenticated users - next.js

import router from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { isUserAuthenticated } = useAuthContext();

  useEffect(() => {
    // checks if the user is authenticated
    isUserAuthenticated() ? router.push("/dashboard") : router.push("/");
  }, []);

  return children;
};

export default ProtectedRoute;
