import { DarkMode, LightMode, Person } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { BottomNavigation, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";

import logodark from "../../assets/images/logo-dark.png";
import logo from "../../assets/images/logo.png";
import { useAppThemeContext } from "../../contexts/theme/ThemeContext";
import { AppBar } from "../appbar/AppBar";
import { BottomNav } from "../bottomNav/BottomNav";
import { Drawer } from "../drawer/Drawer";
import { mainListItems } from "../listItems/listItems";

type TypeMenuProps = {
  title: string;
};

export default function Menu(props: TypeMenuProps) {
  const [open, setOpen] = React.useState(true);
  const { toggleTheme, themeName } = useAppThemeContext();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar position="absolute" open={open} sx={window.screen.availWidth < 1300 ? { width: "100%" } : {}}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {props.title}
          </Typography>
          <IconButton color="inherit" onClick={toggleTheme}>
            {themeName === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>
          <IconButton color="inherit">
            <Person />
          </IconButton>
        </Toolbar>
      </AppBar>

      {window.screen.availWidth > 1300 && (
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <Grid
              container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={themeName === "light" ? logodark : logo} alt="Logo" width={140} />
            </Grid>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{mainListItems}</List>
        </Drawer>
      )}

      {window.screen.availWidth < 1300 && (
        <BottomNavigation
          showLabels
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            zIndex: 9999,
            alignItems: "center",
            width: "100%",
          }}
        >
          {BottomNav}
        </BottomNavigation>
      )}
    </>
  );
}
