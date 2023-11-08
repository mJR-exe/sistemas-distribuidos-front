import { AlarmAdd, Article, LocalHospital, People, SupervisedUserCircle } from "@mui/icons-material";

const routes = [
  {
    href: "/usuarios",
    icon: <People />,
    name: "Usuários",
  },
  {
    href: "/pacientes",
    icon: <SupervisedUserCircle />,
    name: "Pacientes",
  },
  {
    href: "/medicos",
    icon: <LocalHospital />,
    name: "Médicos",
  },
  {
    href: "/atendimentos",
    icon: <AlarmAdd />,
    name: "Atendimentos",
  },
  {
    href: "/relatorio",
    icon: <Article />,
    name: "Relatório",
  },
];

export default routes;
