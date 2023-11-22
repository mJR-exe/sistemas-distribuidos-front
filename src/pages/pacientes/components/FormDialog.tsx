import { Check, Close } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  Box,
  Modal,
  TextField,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";

import service from "../../../services/service";

type TypeProps = {
  open: boolean;
  onClose: (event: boolean) => void;
  modalType: string;
  item: {
    id?: number;
    nome?: string;
    dataNascimento?: string;
    sexo?: string;
    fuma?: boolean;
    bebe?: boolean;
    praticaExercicio?: boolean;
    infartou?: boolean;
    alimentacao?: boolean;
    descricaoSintomas?: string;
  };
};

export default function FormDialog(props: TypeProps) {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [sexo, setSexo] = useState("");
  const [fuma, setFuma] = useState(false);
  const [bebe, setBebe] = useState(false);
  const [infartou, setInfartou] = useState(false);
  const [praticaExercicio, setPraticaExercicio] = useState(false);
  const [alimentacao, setAlimentacao] = useState(false);
  const [descricaoSintomas, setDescricaoSintomas] = useState("");

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");

  function updatePaciente() {
    const data = {
      nome,
      sexo,
      fuma,
      dataNascimento,
      bebe,
      praticaExercicio,
      infartou,
      alimentacao,
      descricaoSintomas,
    };

    service
      .updatePaciente(data, props.item.id ?? 0)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function postPaciente() {
    const data = {
      nome,
      sexo,
      fuma,
      dataNascimento,
      bebe,
      alimentacao,
    };

    service
      .postPaciente(data)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.data);
        handleMessage(error.response.data);
      });
  }

  function handleMessage(messageSnackBar: string) {
    setOpenSnackBar(true);
    setMessage(messageSnackBar);
  }

  useEffect(() => {
    setNome(props.item.nome ? props.item.nome : "");
    setSexo(props.item.sexo ? props.item.sexo : "");
    setFuma(props.item.fuma ? props.item.fuma : false);
    setBebe(props.item.bebe ? props.item.bebe : false);
    setDataNascimento(
      props.item.dataNascimento ? props.item.dataNascimento.substring(0, props.item.dataNascimento.length - 14) : ""
    );
    setAlimentacao(props.item.alimentacao ? props.item.alimentacao : false);
    setInfartou(props.item.infartou ? props.item.infartou : false);
    setPraticaExercicio(props.item.praticaExercicio ? props.item.praticaExercicio : false);
    setDescricaoSintomas(props.item.descricaoSintomas ? props.item.descricaoSintomas : "");
  }, [props.item]);

  return (
    <>
      <Modal open={props.open} onClose={() => props.onClose(false)}>
        <Box sx={styles.modal}>
          <div style={styles.div} id="draggable-dialog-title">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props.modalType === "Add" ? "Adicionar Paciente" : "Editar Paciente"}
            </Typography>
            <IconButton onClick={() => props.onClose(false)}>
              <Close />
            </IconButton>
          </div>
          <Grid container spacing={2}>
            <Grid item lg={4}>
              <TextField
                autoFocus
                label="Nome"
                type="text"
                fullWidth
                required
                value={nome}
                onChange={(n) => setNome(n.target.value)}
              />
            </Grid>
            <Grid item lg={4}>
              <TextField
                label="Data de Nascimento"
                InputLabelProps={{ shrink: true }}
                type="date"
                fullWidth
                value={dataNascimento}
                onChange={(n) => setDataNascimento(n.target.value)}
              />
            </Grid>
            <Grid item lg={4}>
              <FormControl fullWidth>
                <InputLabel>O paciente fuma?</InputLabel>
                <Select
                  autoFocus
                  value={fuma || ""}
                  label="O paciente fuma?"
                  onChange={(n) => setFuma(n.target.value === "Sim")}
                >
                  <MenuItem value="Sim">Sim</MenuItem>
                  <MenuItem value="Não">Não</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={4}>
              <FormControl fullWidth>
                <InputLabel>O paciente bebe?</InputLabel>
                <Select
                  autoFocus
                  value={bebe || ""}
                  label="O paciente bebe?"
                  onChange={(n) => setBebe(Boolean(n.target.value === "Sim"))}
                >
                  <MenuItem value="Sim">Sim</MenuItem>
                  <MenuItem value="Não">Não</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={4}>
              <FormControl fullWidth>
                <InputLabel>O paciente pratica exercício?</InputLabel>
                <Select
                  autoFocus
                  value={praticaExercicio || ""}
                  label="O paciente pratica exercício?"
                  onChange={(n) => setPraticaExercicio(Boolean(n.target.value === "Sim"))}
                >
                  <MenuItem value="Sim">Sim</MenuItem>
                  <MenuItem value="Não">Não</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={4}>
              <FormControl fullWidth>
                <InputLabel>O paciente já infartou?</InputLabel>
                <Select
                  autoFocus
                  value={infartou || ""}
                  label="O paciente já infartou?"
                  onChange={(n) => setInfartou(Boolean(n.target.value === "Sim"))}
                >
                  <MenuItem value="Sim">Sim</MenuItem>
                  <MenuItem value="Não">Não</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={4}>
              <FormControl fullWidth>
                <InputLabel>Tem boa alimentação?</InputLabel>
                <Select
                  autoFocus
                  value={alimentacao || ""}
                  label="Tem boa alimentação?"
                  onChange={(n) => setAlimentacao(Boolean(n.target.value === "Sim"))}
                >
                  <MenuItem value="Sim">Sim</MenuItem>
                  <MenuItem value="Não">Não</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={8}>
              <TextField
                label="Descrição dos sintomas"
                type="text"
                fullWidth
                value={descricaoSintomas}
                onChange={(n) => setDescricaoSintomas(n.target.value)}
              />
            </Grid>
            <Grid item lg={12} sx={styles.modalFooter}>
              <IconButton
                aria-label="Adicionar"
                color="success"
                onClick={props.modalType === "Add" ? postPaciente : updatePaciente}
              >
                <Check fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackBar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenSnackBar(false)} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

const styles = {
  modal: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    boxShadow: 15,
    p: 4,
    borderRadius: 5,
  },
  div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "move",
  },
  modalFooter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mt: 1,
  },
};
