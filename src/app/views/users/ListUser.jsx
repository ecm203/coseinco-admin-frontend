import React,{useState} from 'react'
import {
  Breadcrumb,
  SimpleCard,
  ConfirmationDialog,
} from 'app/components'
import {
  Avatar,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
  Icon,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from '@mui/material'

const listaEmpleado=[
  {
    foto:"https://media-exp1.licdn.com/dms/image/C4D03AQHYRdQqVxavfg/profile-displayphoto-shrink_100_100/0/1632850629496?e=1640217600&v=beta&t=XTq2bRDZGVzgvacVNZOPJbzBChPp_k4WS2Wn7sXTIa8",
    nombre:"Juan Perez",
    rol:"Conductor",
    estado:"Habilitado",
    tipoDoc:"DNI",
    nroDoc:98765431,
  },
  {
    foto:"https://media-exp1.licdn.com/dms/image/C4D03AQHYRdQqVxavfg/profile-displayphoto-shrink_100_100/0/1632850629496?e=1640217600&v=beta&t=XTq2bRDZGVzgvacVNZOPJbzBChPp_k4WS2Wn7sXTIa8",
    nombre:"Karla Moreno",
    rol:"Tecnico",
    estado:"Inhabilitado",
    tipoDoc:"Carnet de Extranjeria",
    nroDoc:98765431,
  },
  {
    foto:"https://media-exp1.licdn.com/dms/image/C4D03AQHYRdQqVxavfg/profile-displayphoto-shrink_100_100/0/1632850629496?e=1640217600&v=beta&t=XTq2bRDZGVzgvacVNZOPJbzBChPp_k4WS2Wn7sXTIa8",
    nombre:"Melisa Gutierrez",
    rol:"Jefe de Compra",
    estado:"Habilitado",
    tipoDoc:"DNI",
    nroDoc:98765431,
  },
]

const ListUser = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [name,setNameUsuario]=useState(null);
  const[estado,setEstado]=useState(0);

  const[edit,setEdit]=useState("");

  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)

  const handleOpenEditModal = (id) => {
    setModal(true)
    setEdit(listaEmpleado[id])
  }
  const handleCloseEditModal = () => {
    setModal(false)
  }
  const handleOpenViewModal = (id) => {
    setModal2(true)
    setEdit(listaEmpleado[id])
  }
  const handleCloseViewModal = () => {
    setModal2(false)
  }


  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const handleChangeEstado=(index)=>{
    listaEmpleado[index].estado="Inhabilitado"
  }

  const handleOpenModal = (nombre,index) => {
    setIsOpenModal(true)
    setNameUsuario(nombre)
    setEstado(index)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <>
    <div className="m-sm-30">
          <div className="mb-sm-30">
            <Breadcrumb routeSegments={[{ name: 'Listar Usuario' }]} />
          </div>
          <SimpleCard title={`${listaEmpleado.length} Usuarios`}>
            <div className="overflow-auto">
              <Table className={'whitespace-pre min-w-600'}>
                <TableHead>
                  <TableRow>
                    <TableCell className="px-0" colSpan={1}>
                      Nro.
                    </TableCell>
                    <TableCell className="px-0" colSpan={4}>
                      Nombre y Apellido
                    </TableCell>
                    <TableCell className="pr-5" align="left" colSpan={1}>
                      Rol
                    </TableCell>
                    <TableCell className="pl-5" align="left" colSpan={1}>
                      Estado
                    </TableCell>
                    <TableCell className="px-5" align="left" colSpan={2}>
                      Acciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listaEmpleado
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((emp, index) => (
                    <TableRow key={index}>
                      <TableCell
                        colSpan={1}
                        className="px-0 capitalize"
                        align="left"
                      >
                        {index}
                      </TableCell>
                      <TableCell
                        colSpan={4}
                        className="px-0 capitalize"
                        align="left"
                      >
                        <div className="flex items-center">
                          {<Avatar src={emp.foto} />}
                          <p className="m-0 ml-4">{emp.nombre}</p>
                        </div>
                      </TableCell>
                      <TableCell colSpan={1} className="pr-5" align="left">
                        {emp.rol}
                      </TableCell>
                      <TableCell className="pl-5" colSpan={1}>
                        {emp.estado}
                      </TableCell>
                      <TableCell colSpan={2} className="px-5">
                        <Tooltip title="Visualizar"
                        onClick={() =>
                          handleOpenViewModal(index)
                        }
                        >
                          <IconButton size="large">
                            <Icon color="primary">visibility</Icon>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar"
                        onClick={() =>
                          handleOpenEditModal(index)
                        }
                        >
                          <IconButton size="large">
                            <Icon color="primary">edit</Icon>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Anular"
                        onClick={() =>
                          handleOpenModal(emp.nombre,index)
                        }
                        >
                          <IconButton size="large">
                            <Icon color="primary">do_not_disturb_alt</Icon>
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={listaEmpleado.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </SimpleCard>
        </div>
        <ConfirmationDialog
            open={isOpenModal}
            onConfirmDialogClose={handleCloseModal}
            onYesClick={handleChangeEstado(estado)}
            title={'Inhabilitar Usuario'}
            text={`Esta seguro que desear inhabilitar a ${name}`}
          />
          <Dialog
          open={modal}
          fullWidth
          maxWidth="xs"
          onClose={handleCloseEditModal}
          >
                <DialogTitle>Editar Usuario</DialogTitle>
                <DialogContent sx={{ overflowY: 'hidden' }}>
                <Grid container spacing={4}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                              fullWidth
                              type="text"
                              size="small"
                              variant="outlined"
                              label="Nombre y Apellido"
                              defaultValue={edit.nombre}
                            />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                              fullWidth
                              type="text"
                              size="small"
                              variant="outlined"
                              label="Rol"
                              defaultValue={edit.rol}
                            />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                              fullWidth
                              type="text"
                              size="small"
                              variant="outlined"
                              label="Tipo de Documento"
                              defaultValue={edit.tipoDoc}
                            />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                              fullWidth
                              type="text"
                              size="small"
                              variant="outlined"
                              label="Nro. de Documento"
                              defaultValue={edit.nroDoc}
                            />
                    </Grid>
                </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseEditModal}>Cerrar</Button>
                  <Button onClick={handleCloseEditModal}>Guardar</Button>
                </DialogActions>
          </Dialog>
          <Dialog
          open={modal2}
          fullWidth
          maxWidth="xs"
          onClose={handleCloseViewModal}
          >
                <DialogTitle>Ver Datos de Usuario</DialogTitle>
                <DialogContent sx={{ overflowY: 'hidden' }}>
                <Grid container spacing={4}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                              fullWidth
                              type="text"
                              size="small"
                              variant="outlined"
                              label="Nombre y Apellido"
                              defaultValue={edit.nombre}
                              disabled={true}
                            />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                              fullWidth
                              type="text"
                              size="small"
                              variant="outlined"
                              label="Rol"
                              defaultValue={edit.rol}
                              disabled={true}
                            />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                              fullWidth
                              type="text"
                              size="small"
                              variant="outlined"
                              label="Tipo de Documento"
                              defaultValue={edit.tipoDoc}
                              disabled={true}
                            />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                              fullWidth
                              type="text"
                              size="small"
                              variant="outlined"
                              label="Nro. de Documento"
                              defaultValue={edit.nroDoc}
                              disabled={true}
                            />
                    </Grid>
                </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseViewModal}>Cerrar</Button>
                </DialogActions>
          </Dialog>
    </>
  )
}

export default ListUser
