import { LogoutOutlined } from "@mui/icons-material";
import Link from "@mui/material/Link";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import routes from "../../routes";

function handleLogout() {
  window.history.replaceState(null, "", "/");
  localStorage.removeItem("@token");
  window.location.reload();
}

export const mainListItems = (
  <>
    {routes.map((item) => (
      <Link key={item.name} href={item.href} underline="none">
        <ListItemButton>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      </Link>
    ))}

    <ListItemButton onClick={handleLogout}>
      <ListItemIcon>
        <LogoutOutlined />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItemButton>
  </>
);
