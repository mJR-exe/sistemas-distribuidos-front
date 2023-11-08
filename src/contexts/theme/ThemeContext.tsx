import { ThemeProvider, Box } from "@mui/material";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { theme as darkTheme, lightTheme } from "../../styles/theme/index";

type IThemeContextData = {
  themeName: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext({} as IThemeContextData);

export function useAppThemeContext() {
  return useContext(ThemeContext);
}

export function AppThemeProvider({ children }: { children: JSX.Element }) {
  const [themeName, setThemeName] = useState<"light" | "dark">("dark");

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) => (oldThemeName === "light" ? "dark" : "light"));
  }, []);

  const theme = useMemo(() => {
    if (themeName === "light") {
      return lightTheme;
    }
    return darkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider
      value={{
        themeName,
        toggleTheme,
      }}
    >
      <ThemeProvider theme={theme}>
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
