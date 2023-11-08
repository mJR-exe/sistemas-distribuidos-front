import {
  Button,
  TableContainer,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  AlertColor,
  Typography,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useState } from "react";

import AlertComponent from "../../../components/alert/AlertComponent";
import service from "../../../services/service";
import FormDialog from "./FormDialog";

type TypeProps = {
  data: TypeData[];
};

export type TypeData = {
  id: number;
  nome: string;
  email: string;
  crm: string;
};

export default function TableMedicos(props: TypeProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [itensModal, setItensModal] = useState<TypeData>({ id: 0, nome: "", email: "", crm: "" });

  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<AlertColor>();

  function handleChangePage(_event: MouseEvent<HTMLButtonElement> | null, newPage: number) {
    setPage(newPage);
  }

  function handleMessage(messageAlert: string, typeAlert: AlertColor, titleAlert?: string) {
    setOpenAlert(true);
    setMessage(messageAlert);
    setType(typeAlert);
    setTitle(titleAlert || "");
  }

  function handleChangeRowsPerPage(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function handleEditOpen(item: TypeData) {
    setItensModal(item);
    setOpenDialogEdit(true);
  }

  function deleteMedico(id: number) {
    service
      .deleteMedico(id)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {props.data ? (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>CRM</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: TypeData) => (
                <TableRow key={item.nome}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.crm}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleEditOpen(item)}
                      variant="contained"
                      size="small"
                      color="primary"
                      sx={{ mx: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={() => handleMessage("Deseja excluir o médico?", "warning", "Atenção")}
                    >
                      Deletar
                    </Button>
                  </TableCell>
                  <AlertComponent
                    open={openAlert}
                    onClose={() => setOpenAlert(false)}
                    onConfirm={() => deleteMedico(item.id)}
                    title={title}
                    message={message}
                    type={type}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={props.data.length}
            page={page}
            labelRowsPerPage="Linhas por página"
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <Typography variant="h6" align="center">
          Nenhum médico cadastrado...
        </Typography>
      )}
      <FormDialog item={itensModal} modalType="Edit" open={openDialogEdit} onClose={() => setOpenDialogEdit(false)} />
    </>
  );
}
