import { Check, Close } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  Box,
  Modal,
  Typography,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";

import service from "../../../services/service";
import { TypeData as TypeMedico } from "../../medicos/components/TableMedicos";
import { TypeData as TypePaciente } from "../../pacientes/components/TablePacientes";

type TypeProps = {
  open: boolean;
  onClose: (event: boolean) => void;
  modalType: string;
  item: {
    id?: number;
    idMedico?: number;
    idPaciente?: number;
  };
};

export default function FormDialog(props: TypeProps) {
  const [idPaciente, setIdPaciente] = useState(0);
  const [idMedico, setIdMedico] = useState(0);
  const [dataMedicos, setDataMedicos] = useState<TypeMedico[]>([]);
  const [dataPacientes, setDataPacientes] = useState<TypePaciente[]>([]);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");

  function updateAtendimento() {
    const data = {
      idMedico,
      idPaciente,
    };

    service
      .updateAtendimento(data, props.item.id ?? 0)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function postAtendimento() {
    const data = {
      idMedico,
      idPaciente,
    };

    service
      .postAtendimento(data)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.data);
        handleMessage(error.response.data);
      });
  }

  function getMedicos() {
    service
      .getMedicos()
      .then((response) => {
        console.log(response.data);
        setDataMedicos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getPacientes() {
    service
      .getPacientes()
      .then((response) => {
        console.log(response.data);
        setDataPacientes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleMessage(messageSnackBar: string) {
    setOpenSnackBar(true);
    setMessage(messageSnackBar);
  }

  useEffect(() => {
    setIdMedico(props.item.idMedico ? props.item.idMedico : 0);
    setIdPaciente(props.item.idPaciente ? props.item.idPaciente : 0);
    getMedicos();
    getPacientes();
  }, [props.item]);

  return (
    <>
      <Modal open={props.open} onClose={() => props.onClose(false)}>
        <Box sx={styles.modal}>
          <div style={styles.div} id="draggable-dialog-title">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props.modalType === "Add" ? "Adicionar Atendimento" : "Editar Atendimento"}
            </Typography>
            <IconButton onClick={() => props.onClose(false)}>
              <Close />
            </IconButton>
          </div>
          <Grid container spacing={2}>
            <Grid item lg={6}>
              <FormControl fullWidth>
                <InputLabel>Médico</InputLabel>
                <Select
                  autoFocus
                  value={idMedico || ""}
                  label="Médico"
                  onChange={(e) => setIdMedico(Number(e.target.value))}
                >
                  {dataMedicos ? (
                    dataMedicos.map((item: TypeMedico) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.nome}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">
                      <em>Nenhum médico encontrado</em>
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={6}>
              <FormControl fullWidth>
                <InputLabel>Paciente</InputLabel>
                <Select
                  autoFocus
                  value={idPaciente || ""}
                  label="Paciente"
                  onChange={(e) => setIdPaciente(Number(e.target.value))}
                >
                  {dataPacientes ? (
                    dataPacientes.map((item: TypePaciente) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.nome}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">
                      <em>Nenhum paciente encontrado</em>
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={12} sx={styles.modalFooter}>
              <IconButton
                aria-label="Adicionar"
                color="success"
                onClick={props.modalType === "Add" ? postAtendimento : updateAtendimento}
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
