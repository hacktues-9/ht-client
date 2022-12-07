import { createContext, useState } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext(
  {} as {
    authState: {
      token: string;
    };
    setAuthState: (userAuthInfo: string) => void;
    isUserAuthenticated: () => boolean;
  }
);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: "",
  });

const setUserAuthInfo = (data: any) => {
  const token: string = data.data;
  localStorage.setItem("token", data.data);

  setAuthState({
    token,
  });
};

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => !!authState.token;

  return (
    <Provider
      value={{
        authState,
        setAuthState: (userAuthInfo: string) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
