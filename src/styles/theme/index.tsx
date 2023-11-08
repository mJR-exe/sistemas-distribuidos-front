import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#5ab0af",
      contrastText: "#fff",
    },
    background: {
      default: "#1e1e2f",
      paper: "#27293d",
    },
    secondary: {
      main: "#D7E0FC",
      contrastText: "#fff",
    },
    success: {
      main: "#1aba5a",
      contrastText: "#fff",
    },
    text: {
      primary: "#fff",
      secondary: "#eee",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    background: {
      default: "#fafdff",
      paper: "#fff",
    },
    primary: {
      main: "#458BB4",
    },
    secondary: {
      main: "#5400BA",
      contrastText: "#000",
    },
    success: {
      main: "#1aba5a",
      contrastText: "#000",
    },
    text: {
      primary: "#000",
      secondary: "#010101",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#000",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#458BB4",
        },
      },
    },
  },
});
