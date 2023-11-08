import { Add } from "@mui/icons-material";
import { Button, Box, Container, CssBaseline, Grid, Paper, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";

import Menu from "../../components/menu/Menu";
import service from "../../services/service";
import FormDialog from "./components/FormDialog";
import TableAtendimentos, { TypeData } from "./components/TableAtendimentos";

function AtendimentosContent() {
  const [openDialog, setOpenDialog] = useState(false);
  const [dataAtendimentos, setDataAtendimentos] = useState([] as TypeData[]);

  function getAtendimentos() {
    service
      .getAtendimentos()
      .then((response) => {
        console.log(response.data);
        setDataAtendimentos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAtendimentos();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Menu title="Atendimentos" />
        <Box component="main" sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>
          <Toolbar />
          <Container maxWidth="xl">
            <Grid container columnSpacing={1} sx={{ alignItems: "center", justifyContent: "center", my: 3 }}>
              <Grid item lg={2} sx={{ my: 3 }}>
                <Button variant="contained" startIcon={<Add />} fullWidth onClick={() => setOpenDialog(true)}>
                  Atendimento
                </Button>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              {/* Atendimentos */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <TableAtendimentos data={dataAtendimentos} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      <FormDialog modalType="Add" open={openDialog} onClose={() => setOpenDialog(false)} item={{}} />
    </>
  );
}

export default function Atendimentos() {
  return <AtendimentosContent />;
}
