import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { ReactNode } from "react";

type TypeSpeedDial = {
  itens: [
    {
      icon: ReactNode;
      name: string;
      onClick?: () => void;
    }
  ];
};

export default function BasicSpeedDial(props: TypeSpeedDial) {
  return (
    <SpeedDial ariaLabel="SpeedDial" sx={{ position: "absolute", bottom: 16, right: 16 }} icon={<SpeedDialIcon />}>
      {props.itens.map((item) => (
        <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.onClick} />
      ))}
    </SpeedDial>
  );
}
