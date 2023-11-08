import { Check, Warning } from "@mui/icons-material";
import {
  AlertColor,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type TypeAlert = {
  open: boolean;
  title: string;
  message?: string;
  type?: AlertColor;
  onClose: (event: false) => void;
  onConfirm: () => void;
};

export default function AlertComponent(props: TypeAlert) {
  function handleKeyDown(e: { keyCode: number }) {
    if (e.keyCode === 13) {
      props.onClose(false);
    }
  }

  return (
    <Dialog
      onKeyDown={handleKeyDown}
      open={props.open}
      keepMounted
      onClose={() => props.onClose(false)}
      sx={{ zIndex: 99999 }}
    >
      <DialogTitle align="center">
        {props.type === "error" && <Warning fontSize="large" color="warning" />}
        {props.type === "success" && <Check fontSize="large" color="success" />}
      </DialogTitle>
      <DialogContent>
        <DialogContentText align="center">{props.message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" onClick={() => props.onClose(false)}>
          Fechar
        </Button>
        <Button variant="contained" color="success" onClick={() => props.onConfirm()}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
