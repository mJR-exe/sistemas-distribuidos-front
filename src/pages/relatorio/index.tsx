import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Toolbar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";

import Menu from "../../components/menu/Menu";
import service from "../../services/service";

type TypeRelatorio = {
  id: number;
  medico: string;
  paciente: string;
  criado: string;
};

export default function Relatorio() {
  const [dataRelatorio, setDataRelatorio] = useState<TypeRelatorio[]>([]);

  function getRelatorio() {
    service
      .getRelatorio()
      .then((response) => {
        console.log(response.data);
        setDataRelatorio(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getRelatorio();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Menu title="Relatório" />
      <Box component="main" sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>
        <Toolbar />
        <Container maxWidth="xl">
          <Grid container sx={{ alignItems: "center", justifyContent: "center", my: 3 }}>
            <Grid item lg={12}>
              <Paper>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Médico</TableCell>
                      <TableCell>Paciente</TableCell>
                      <TableCell>Criado em</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataRelatorio.map((item: TypeRelatorio) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.medico}</TableCell>
                        <TableCell>{item.paciente}</TableCell>
                        <TableCell>{item.criado}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
