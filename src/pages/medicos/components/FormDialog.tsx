import { Check, Close } from "@mui/icons-material";
import { Grid, IconButton, Box, Modal, TextField, Typography, Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

import service from "../../../services/service";

type TypeProps = {
  open: boolean;
  onClose: (event: boolean) => void;
  modalType: string;
  item: {
    id?: number;
    nome?: string;
    email?: string;
    password?: string;
    crm?: string;
  };
};

export default function FormDialog(props: TypeProps) {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [crm, setCrm] = useState("");

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");

  function updateMedico() {
    const data = {
      email,
      nome,
      password,
      crm,
    };

    service
      .updateMedico(data, props.item.id ?? 0)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function postMedico() {
    const data = {
      email,
      nome,
      password,
      crm,
    };

    service
      .postMedico(data)
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
    setEmail(props.item.email ? props.item.email : "");
    setNome(props.item.nome ? props.item.nome : "");
    setPassword(props.item.password ? props.item.password : "");
    setCrm(props.item.crm ? props.item.crm : "");
  }, [props.item]);

  return (
    <>
      <Modal open={props.open} onClose={() => props.onClose(false)}>
        <Box sx={styles.modal}>
          <div style={styles.div} id="draggable-dialog-title">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props.modalType === "Add" ? "Adicionar Médico" : "Editar Médico"}
            </Typography>
            <IconButton onClick={() => props.onClose(false)}>
              <Close />
            </IconButton>
          </div>
          <Grid container spacing={2}>
            <Grid item lg={6}>
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
            <Grid item lg={6}>
              <TextField
                autoFocus
                label="CRM"
                type="text"
                fullWidth
                required
                value={crm}
                onChange={(n) => setCrm(n.target.value)}
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(n) => setEmail(n.target.value)}
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                label="Senha"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(n) => setPassword(n.target.value)}
              />
            </Grid>
            <Grid item lg={12} sx={styles.modalFooter}>
              <IconButton
                aria-label="Adicionar"
                color="success"
                onClick={props.modalType === "Add" ? postMedico : updateMedico}
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
