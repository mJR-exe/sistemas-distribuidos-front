import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthContext } from "./contexts/auth/AuthContext";
import { AppThemeProvider } from "./contexts/theme/ThemeContext";
import Atendimentos from "./pages/atendimentos";
import Login from "./pages/login";
import Medicos from "./pages/medicos";
import Pacientes from "./pages/pacientes";
import Relatorio from "./pages/relatorio";
import Usuarios from "./pages/usuarios";

import "./styles/global.css";

export default function App() {
  return (
    <AppThemeProvider data-testId="App">
      <AuthContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/pacientes" element={<Pacientes />} />
            <Route path="/medicos" element={<Medicos />} />
            <Route path="/atendimentos" element={<Atendimentos />} />
            <Route path="/relatorio" element={<Relatorio />} />
          </Routes>
        </BrowserRouter>
      </AuthContext>
    </AppThemeProvider>
  );
}
