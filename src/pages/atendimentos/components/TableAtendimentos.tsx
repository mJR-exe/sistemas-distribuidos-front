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
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

import AlertComponent from "../../../components/alert/AlertComponent";
import service from "../../../services/service";
import { TypeData as TypeMedico } from "../../medicos/components/TableMedicos";
import { TypeData as TypePaciente } from "../../pacientes/components/TablePacientes";
import FormDialog from "./FormDialog";

type TypeProps = {
  data: TypeData[];
};

export type TypeData = {
  id: number;
  idMedico: number;
  idPaciente: number;
};

export default function TableAtendimentos(props: TypeProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [itensModal, setItensModal] = useState<TypeData>({ id: 0, idMedico: 0, idPaciente: 0 });

  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<AlertColor>();

  const [dataMedicos, setDataMedicos] = useState<TypeMedico[]>([]);
  const [dataPacientes, setDataPacientes] = useState<TypePaciente[]>([]);

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

  function deleteAtendimento(id: number) {
    service
      .deleteAtendimento(id)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
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

  useEffect(() => {
    getMedicos();
    getPacientes();
  }, []);

  return (
    <>
      {props.data ? (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Paciente</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: TypeData) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  {dataMedicos.map((medico: TypeMedico) => {
                    if (medico.id === item.idMedico) {
                      return <TableCell>{medico.nome}</TableCell>;
                    }
                  })}
                  {dataPacientes.map((paciente: TypePaciente) => {
                    if (paciente.id === item.idPaciente) {
                      return <TableCell>{paciente.nome}</TableCell>;
                    }
                  })}
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
                      onClick={() => handleMessage("Deseja excluir o atendimento?", "warning", "Atenção")}
                    >
                      Deletar
                    </Button>
                  </TableCell>
                  <AlertComponent
                    open={openAlert}
                    onClose={() => setOpenAlert(false)}
                    onConfirm={() => deleteAtendimento(item.id)}
                    title={title}
                    message={message}
                    type={type}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[15, 20]}
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
          Nenhum atendimento cadastrado...
        </Typography>
      )}
      <FormDialog item={itensModal} modalType="Edit" open={openDialogEdit} onClose={() => setOpenDialogEdit(false)} />
    </>
  );
}
