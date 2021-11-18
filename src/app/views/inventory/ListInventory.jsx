import React, { useEffect, useState } from 'react'
import {
  Breadcrumb,
  SimpleCard,
  MaxtBackdrop,
  MatxSnackbar,
} from 'app/components'
import {
  Avatar,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  Tooltip,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
} from '@mui/material'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import makeStyles from '@mui/styles/makeStyles'
import clsx from 'clsx'

const useStyles = makeStyles({
  dialog: {
    '& .MuiDialog-paper': {
      transition: 'all .2s',
    },
  },
  dialogLoading: {
    '& .MuiDialog-paper': {
      height: '200px',
      maxHeight: '200px',
    },
  },
})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const ListInventory = () => {
  const classes = useStyles()
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)
  const [modal, setModal] = useState(false)
  const [inventario, setInventario] = useState(null)
  const [serie, setSerie] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingModal, setIsLoadingModal] = useState(true)
  const [producto, setProducto] = useState(null)
  const history = useHistory()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    history.push('/')
    setIsError(false)
  }

  const handleOpenModal = (id, nombre) => {
    setModal(true)
    listarSeries(id)
    setProducto(nombre)
  }
  const handleCloseModal = () => {
    setModal(false)
  }
  useEffect(() => {
    listarInventario()
  }, [])

  const listarInventario = () => {
    setInventario(null)
    setIsLoading(true)
    axios.get(`http://localhost:5000/api-admin/inventario/getInventarios`).then(
      (response) => {
        setInventario(response.data.inventarioslist)
        setIsLoading(false)
      },
      (error) => {
        console.log(error)
        setIsLoading(false)
        setIsError(true)
      }
    )
  }
  const listarSeries = (id) => {
    setSerie(null)
    setIsLoadingModal(true)
    axios
      .get(
        `http://localhost:5000/api-admin/inventario/getSeriesByProductId/` + id
      )
      .then(
        (response) => {
          setSerie(response.data.nSeries)
          setIsLoadingModal(false)
        },
        (error) => {
          setIsLoadingModal(false)
        }
      )
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <>
      <MaxtBackdrop isOpen={isLoading} />
      {!isLoading && !isError && (
        <>
          <div className="m-sm-30">
            <div className="mb-sm-30">
              <Breadcrumb routeSegments={[{ name: 'Inventario' }]} />
            </div>
            <SimpleCard
              title={`${inventario?.length} productos en el inventario`}
            >
              <Table className="whitespace-pre">
                <TableHead>
                  <TableRow>
                    <TableCell className="px-0" colSpan={1}>
                      SKU
                    </TableCell>
                    <TableCell className="px-0" colSpan={3}>
                      Nombre del Producto
                    </TableCell>
                    <TableCell className="pr-6" align="right" colSpan={1}>
                      Cantidad
                    </TableCell>
                    <TableCell className="px-0" colSpan={2}>
                      Marca
                    </TableCell>
                    <TableCell className="px-0" colSpan={2}>
                      Acciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inventario &&
                    inventario
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((inv, index) => (
                        <TableRow key={index}>
                          <TableCell className="px-0 capitalize" colSpan={1}>
                            {inv.sku}
                          </TableCell>
                          <TableCell className="px-0 capitalize" colSpan={3}>
                            <div className="flex items-center">
                              <Avatar src={inv.imagen} />
                              <p className="m-0 ml-4">{inv.nombre}</p>
                            </div>
                          </TableCell>
                          <TableCell className="pr-6" align="right" colSpan={1}>
                            {inv.cantidad}
                          </TableCell>
                          <TableCell className="px-0 capitalize" colSpan={2}>
                            {inv.marca}
                          </TableCell>
                          <TableCell className="px-0" colSpan={2}>
                            <Tooltip title="Visualizar pedido">
                              <IconButton
                                size="large"
                                onClick={() =>
                                  handleOpenModal(inv.productoID, inv.nombre)
                                }
                              >
                                <Icon color="primary">visibility</Icon>
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
                count={inventario.length}
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
            </SimpleCard>
          </div>
          <Dialog
            open={modal}
            fullWidth
            maxWidth="xs"
            onClose={handleCloseModal}
            TransitionComponent={Transition}
            className={clsx(
              classes.dialog,
              isLoadingModal && classes.dialogLoading
            )}
          >
            <MaxtBackdrop isOpen={isLoadingModal} />
            {!isLoadingModal && (
              <>
                <DialogTitle>{producto}</DialogTitle>
                <DialogContent sx={{ overflowY: 'hidden' }}>
                  <Table className="whitespace-pre">
                    <TableHead>
                      <TableRow>
                        <TableCell className="px-0" colSpan={1}>
                          Indice
                        </TableCell>
                        <TableCell className="px-0" colSpan={3}>
                          N° Serie
                        </TableCell>
                        <TableCell className="px-0" colSpan={2}>
                          Estado
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {serie?.map((s, index) => (
                        <TableRow key={index}>
                          <TableCell className="px-0" colSpan={1}>
                            {index + 1}
                          </TableCell>
                          <TableCell className="px-0" colSpan={3}>
                            {s.numero}
                          </TableCell>
                          <TableCell className="px-0 capitalize" colSpan={2}>
                            {s.estado}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseModal}>Cerrar</Button>
                </DialogActions>
              </>
            )}
          </Dialog>
        </>
      )}
      {!isLoading && isError && (
        <MatxSnackbar
          open={isError}
          title={'Error'}
          message={<>Sucedió algo inesperado intentelo nuevamente</>}
          handleClose={handleClose}
        />
      )}
    </>
  )
}

export default ListInventory
