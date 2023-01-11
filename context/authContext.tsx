import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";


// store refresh token in local storage
// 1 get token / refresh token
/* payload: {
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWZyZXNoVG9rZW5GYW1pbHlJZCI6IjYzYWI3YjRjODI3NjA1ZTBkYTE5MTE5MSIsInJlZnJlc2hUb2tlbklkIjoiNjNhYjdiNTQ4Mjc2MDVlMGRhMTkxMTlmIiwidXNlcklkIjoiNjNhYjdiNGM4Mjc2MDVlMGRhMTkxMThlIiwiaWF0IjoxNjcyMTgyNjEyLCJleHAiOjE2NzI3ODc0MTJ9.B0IXIquPMoYzcOxInnGF82YCX1TTzuUKuK5jsOaCXc4"
} */
/* response: {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWZyZXNoVG9rZW5GYW1pbHlJZCI6IjYzYWI3YjRjODI3NjA1ZTBkYTE5MTE5MSIsInJlZnJlc2hUb2tlbklkIjoiNjNhYjdiZTg4Mjc2MDVlMGRhMTkxMWE3IiwidXNlcklkIjoiNjNhYjdiNGM4Mjc2MDVlMGRhMTkxMThlIiwiaWF0IjoxNjcyMTgyNzYwLCJleHAiOjE2NzIxODI3ODB9.mSBSIt3V5VOCQLKy7EByOG9txHqCDhqVCWl5oiZ4VGY",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWZyZXNoVG9rZW5GYW1pbHlJZCI6IjYzYWI3YjRjODI3NjA1ZTBkYTE5MTE5MSIsInJlZnJlc2hUb2tlbklkIjoiNjNhYjdiZTg4Mjc2MDVlMGRhMTkxMWE3IiwidXNlcklkIjoiNjNhYjdiNGM4Mjc2MDVlMGRhMTkxMThlIiwiaWF0IjoxNjcyMTgyNzYwLCJleHAiOjE2NzI3ODc1NjB9.nLuGPSVKJcIxW6jmpk6QL24xTpEW8ubr0f6JgxXKbs8",
    "id": "63ab7b4c827605e0da19118e"
} */

// 2 get primary user info
/* headers: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWZyZXNoVG9rZW5GYW1pbHlJZCI6IjYzYWI3YjRjODI3NjA1ZTBkYTE5MTE5MSIsInJlZnJlc2hUb2tlbklkIjoiNjNhYjdiZTg4Mjc2MDVlMGRhMTkxMWE3IiwidXNlcklkIjoiNjNhYjdiNGM4Mjc2MDVlMGRhMTkxMThlIiwiaWF0IjoxNjcyMTgyNzYwLCJleHAiOjE2NzIxODI3ODB9.mSBSIt3V5VOCQLKy7EByOG9txHqCDhqVCWl5oiZ4VGY*/
/* payload: {
/* response: {
    "emailVerified": false,
    "email": "kaloyan.s.doychinov.2019@elsys-bg.org",
    "hasTeam": false,
    "discordId": "",
    "isCaptain": false
} */

/* interface IUser {
  emailVerified: boolean;

  email: string;
  firstName: string;
  lastName: string;

  hasTeam: boolean;

  discordId: string;

  isCaptain: boolean;


} */

const AuthContext = createContext(
  {} as {
    authState: {
      userId: string;
      token: string;
    };
    setAuthState: (userAuthInfo: string) => void;
    isUserAuthenticated: () => boolean;
  }
);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    userId: "",
    token: "",
  });

  const setUserAuthInfo = (data: any) => {
    const token: string = data.data;
    localStorage.setItem("token", data.data);

    setAuthState({
      userId: " ",
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

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
