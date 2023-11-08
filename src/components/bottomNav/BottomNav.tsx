import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import routes from "../../routes";

export const BottomNav = (
  <>
    {routes.map((item) => (
      <BottomNavigationAction key={item.name} label={item.name} icon={item.icon} href={item.href} />
    ))}
  </>
);
