import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppThemeProvider } from "./contexts/theme/ThemeContext";
import Atendimentos from "./pages/atendimentos";
import Medicos from "./pages/medicos";
import Pacientes from "./pages/pacientes";
import Usuarios from "./pages/usuarios";

import "./styles/global.css";

export default function App() {
  return (
    <AppThemeProvider data-testId="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Usuarios />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/medicos" element={<Medicos />} />
          <Route path="/atendimentos" element={<Atendimentos />} />
        </Routes>
      </BrowserRouter>
    </AppThemeProvider>
  );
}
