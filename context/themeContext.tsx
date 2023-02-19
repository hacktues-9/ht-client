import { createContext, useContext, useState } from "react";
import { TYPE } from "../constants/css";

const ThemeContext = createContext(
  {} as {
    theme: string;
    setTheme: (theme: string) => void;
  }
);
const { Provider } = ThemeContext;

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(TYPE[0]);

  const setThemeType = (theme: string) => {
    if (TYPE.includes(theme)) {
      setTheme(theme);
    }
  };

  return (
    <Provider
      value={{
        theme,
        setTheme: (theme: string) => setThemeType(theme),
      }}
    >
      {children}
    </Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
export default ThemeProvider;
