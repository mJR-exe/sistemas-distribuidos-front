import { Close } from "@mui/icons-material";
import { CardActionArea, CardMedia, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Modal from "@mui/material/Modal";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useState } from "react";

type TypeCardProps = {
  main: string;
  footer?: string;
  image?: string;
  error?: boolean;
  modal?: boolean;
  modalTitle?: string;
  modalText?: string;
  popover?: boolean;
  popoverText?: string;
};

export default function OutlinedCard(props: TypeCardProps) {
  // MODAL
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // POPOVER
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Box sx={{ m: 1 }}>
        <Card>
          <CardActionArea onClick={props.modal ? handleOpen : handleClick} aria-describedby={id}>
            {props.image && <CardMedia component="img" height="140" image={props.image} alt="Imagem - Card" />}
            <CardContent>
              <Typography variant="h4" fontWeight="bold" component="div" color={`${props.error ? "red" : ""}`}>
                {props.main}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.footer}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Popover
          id={id}
          open={openPopover}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 2 }}>{props.popoverText}</Typography>
        </Popover>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modal}>
          <div style={styles.div}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props.modalTitle}
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.modalText}
          </Typography>
        </Box>
      </Modal>
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
  },
};
