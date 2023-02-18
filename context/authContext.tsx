import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext(
  {} as {
    authState: {
      userId: string;
      isLoggedIn: boolean;
    };
    setAuthState: (userId : string, isLoggedIn : boolean) => void;
    isUserAuthenticated: () => boolean | null;
  }
);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    userId: "",
    isLoggedIn: null,
  });

  const setUserAuthInfo = (userId : string, isLoggedIn : boolean) => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());

    setAuthState({
      userId,
      isLoggedIn,
    });
  };

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => authState.isLoggedIn;

  useEffect(() => {
    if (!isUserAuthenticated()) {
      //use fetch to get the user info with credentials
      fetch("https://api.hacktues.bg/api/auth/me", {
        method: "GET",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setUserAuthInfo(data.data, true);
          }else{
            setUserAuthInfo("", false);
          }
        })
        .catch((err) => {
          setUserAuthInfo("", false);
        });
    }
  }, [authState.isLoggedIn]);

  return (
    <Provider
      value={{
        authState,
        setAuthState: (userId : string, isLoggedIn : boolean) => setUserAuthInfo(userId, isLoggedIn),
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
