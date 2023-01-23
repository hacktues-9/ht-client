// protected route component for authenticated users - next.js

import router from "next/router";

const ProtectedRoute = ({ children }) => {
  /*   const { isUserAuthenticated } = useAuthContext();

  if(!isUserAuthenticated) {
    router.push("/");
  } else {
    return children;
  } */

  if (false) {
    router.push("/");
  } else {
    return children;
  }
};

export default ProtectedRoute;
