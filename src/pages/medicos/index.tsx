import { Add, DeleteForever } from "@mui/icons-material";
import { Button, MenuItem, Select, TextField, Box, Container, CssBaseline, Grid, Paper, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";

import Menu from "../../components/menu/Menu";
import service from "../../services/service";
import FormDialog from "./components/FormDialog";
import TableMedicos, { TypeData } from "./components/TableMedicos";

function MedicosContent() {
  const [search, setSearch] = useState("");
  const [list, setList] = useState([] as TypeData[]);
  const [openDialog, setOpenDialog] = useState(false);
  const [campo, setCampo] = useState("");

  const [dataMedicos, setDataMedicos] = useState([] as TypeData[]);

  function getSearch() {
    if (search === "") {
      setList(dataMedicos);
    } else if (campo === "nome") {
      setList(dataMedicos.filter((item: TypeData) => item.nome.toUpperCase().indexOf(search.toUpperCase()) > -1));
    } else {
      setList(dataMedicos.filter((item: TypeData) => item.email.toUpperCase().indexOf(search.toUpperCase()) > -1));
    }
  }

  function clearFilter() {
    setCampo("");
    setSearch("");
    getSearch();
  }

  function getMedicos() {
    service
      .getMedicos()
      .then((response) => {
        console.log(response.data);
        setDataMedicos(response.data);
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getMedicos();
    getSearch();
  }, []);

  useEffect(() => {
    getSearch();
  }, [search]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Menu title="Médicos" />
        <Box component="main" sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>
          <Toolbar />
          <Container maxWidth="xl">
            <Grid container columnSpacing={1} sx={{ alignItems: "center", justifyContent: "center", my: 3 }}>
              <Grid item lg={2} sx={{ my: 3 }}>
                <Button variant="contained" startIcon={<Add />} fullWidth onClick={() => setOpenDialog(true)}>
                  Médico
                </Button>
              </Grid>

              <Grid item lg={2} sx={{ my: 3 }}>
                <Select
                  sx={{ height: 40 }}
                  value={campo}
                  displayEmpty
                  fullWidth
                  onChange={(e) => setCampo(e.target.value)}
                >
                  <MenuItem disabled value="">
                    Filtrar...
                  </MenuItem>
                  <MenuItem value="nome">Nome</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                </Select>
              </Grid>

              <Grid item lg={2} sx={{ my: 3 }}>
                <TextField
                  fullWidth
                  label="Buscar..."
                  type="text"
                  size="small"
                  value={search}
                  onChange={(n) => setSearch(n.target.value)}
                />
              </Grid>

              <Grid item lg={2} sx={{ my: 3 }}>
                <Button variant="contained" startIcon={<DeleteForever />} fullWidth onClick={() => clearFilter()}>
                  limpar
                </Button>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              {/* Medicos */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <TableMedicos data={list} />
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

export default function Medicos() {
  return <MedicosContent />;
}
