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
import { SetStateAction, useEffect, useState } from "react";
import InputMask from "react-input-mask";

import service from "../../../services/service";

type TypeProps = {
  open: boolean;
  onClose: (event: boolean) => void;
  modalType: string;
  item: {
    id?: number;
    nome?: string;
    cpf?: string;
    telefone?: string;
    dataNasc?: string;
    convenio?: string;
    endereco?: string;
  };
};

export default function FormDialog(props: TypeProps) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [convenio, setConvenio] = useState("");
  const [endereco, setEndereco] = useState("");

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");

  function updatePaciente() {
    const data = {
      nome,
      cpf,
      telefone,
      dataNasc,
      convenio,
      endereco,
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
      cpf,
      telefone,
      dataNasc,
      convenio,
      endereco,
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
    setCpf(props.item.cpf ? props.item.cpf : "");
    setTelefone(props.item.telefone ? props.item.telefone : "");
    setDataNasc(props.item.dataNasc ? props.item.dataNasc.substring(0, props.item.dataNasc.length - 14) : "");
    setConvenio(props.item.convenio ? props.item.convenio : "");
    setEndereco(props.item.endereco ? props.item.endereco : "");
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
              <InputMask
                mask="999.999.999-99"
                value={cpf}
                onChange={(n: { target: { value: SetStateAction<string> } }) => setCpf(n.target.value)}
              >
                {/* @ts-ignore */}
                {() => <TextField label="CPF" fullWidth required />}
              </InputMask>
            </Grid>
            <Grid item lg={4}>
              <InputMask mask="(99) 99999-9999" value={telefone} onChange={(n) => setTelefone(n.target.value)}>
                {/* @ts-ignore comment */}
                {() => <TextField label="Telefone" fullWidth required />}
              </InputMask>
            </Grid>
            <Grid item lg={4}>
              <TextField
                label="Data de Nascimento"
                InputLabelProps={{ shrink: true }}
                type="date"
                fullWidth
                value={dataNasc}
                onChange={(n) => setDataNasc(n.target.value)}
              />
            </Grid>
            <Grid item lg={4}>
              <FormControl fullWidth>
                <InputLabel>Convênio</InputLabel>
                <Select autoFocus value={convenio || ""} label="Convênio" onChange={(e) => setConvenio(e.target.value)}>
                  <MenuItem value="Sim">Sim</MenuItem>
                  <MenuItem value="Não">Não</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={4}>
              <TextField
                label="Endereço"
                type="text"
                fullWidth
                value={endereco}
                onChange={(n) => setEndereco(n.target.value)}
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
