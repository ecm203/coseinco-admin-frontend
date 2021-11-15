import React, { useState, useEffect } from 'react'
import {
  Breadcrumb,
  SimpleCard,
  MaxtBackdrop,
  MatxSnackbar,
} from 'app/components'
import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  Tooltip,
  TablePagination,
  Menu,
  MenuItem,
} from '@mui/material'
import axios from 'axios'
import { useHistory } from 'react-router'
import SendOrderModal from './SendOrderModal'
import { Link } from 'react-router-dom'

const apiUrl = 'http://localhost:5000/api'

const SendOrder = () => {
  const history = useHistory()
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [orders, setOrders] = useState(null)
  const [orderModal, setOrderModal] = useState(false)
  const [orderSelected, setOrderSelected] = useState(null)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const openMenu = Boolean(anchorEl)
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    loadTableData()
    return () => {
      loadTableData()
    }
  }, [])

  const sendOrder = (order, data) => {
    setIsLoading(true)
    axios
      .post(`http://localhost:5000/api-admin/envio/createEnvio`, {
        pedidoID: order.id,
        nomEncargado: data.driver.nombres + ' ' + data.driver.apellidos,
      })
      .then(
        (response) => {
          console.log(response)
          loadTableData()
        },
        (error) => {
          console.log(error)
          loadTableData()
        }
      )
  }

  const loadTableData = () => {
    setOrders(null)
    setIsLoading(true)
    axios.get(`${apiUrl}/pedidos/admin/reservas`).then(
      (response) => {
        const data = response.data.pedidosres.filter(
          (el) =>
            el.estado === 'empaquetado' ||
            el.estado === 'enviado' ||
            el.estado === 'finalizado'
        )
        setOrders(data)
        setIsLoading(false)
      },
      (error) => {
        setIsLoading(false)
        setIsError(true)
      }
    )
  }

  const handleOpenModal = (order) => {
    setOrderModal(true)
    setOrderSelected(order)
  }

  const handleCloseModal = () => {
    setOrderModal(false)
  }

  return (
    <>
      <MaxtBackdrop isOpen={isLoading} />
      {!isLoading && !isError && (
        <div className="m-sm-30">
          <div className="mb-sm-30">
            <Breadcrumb routeSegments={[{ name: 'Enviar pedido' }]} />
          </div>
          <SimpleCard title={`${orders?.length} pedidos registrados`}>
            <Table className="whitespace-pre">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={1} className="px-0">
                    ID Pedido
                  </TableCell>
                  <TableCell colSpan={3} className="px-0">
                    Cliente
                  </TableCell>
                  <TableCell colSpan={2} className="px-0">
                    Distrito
                  </TableCell>
                  <TableCell colSpan={1} className="pr-5" align="right">
                    Cantidad
                  </TableCell>
                  <TableCell colSpan={2} className="px-0">
                    Estado
                  </TableCell>
                  <TableCell colSpan={2} className="px-0">
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders &&
                  orders
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((subscriber, index) => (
                      <TableRow key={index}>
                        <TableCell
                          colSpan={1}
                          className="px-0 capitalize"
                          align="left"
                        >
                          {subscriber.codigo}
                        </TableCell>
                        <TableCell
                          colSpan={3}
                          className="px-0 capitalize"
                          align="left"
                        >
                          {subscriber.cliente.name +
                            ' ' +
                            subscriber.cliente.lastName}
                        </TableCell>
                        <TableCell colSpan={2}>
                          {subscriber.cliente.distrito}
                        </TableCell>
                        <TableCell colSpan={1} className="pr-5" align="right">
                          {subscriber.cantidad}
                        </TableCell>
                        <TableCell
                          colSpan={2}
                          className="px-0 capitalize"
                          align="left"
                        >
                          {subscriber.estado}
                        </TableCell>
                        <TableCell colSpan={2} className="px-0">
                          <Tooltip title="Visualizar pedido">
                            <Link
                              to={`/pedidos/?codigo=${subscriber.codigo}&serialNumber=false&breadcrum=sendOrder`}
                            >
                              <IconButton size="large">
                                <Icon color="primary">visibility</Icon>
                              </IconButton>
                            </Link>
                          </Tooltip>
                          {subscriber.estado === 'enviado' && (
                            <Tooltip title="Finalizar">
                              <IconButton size="large">
                                <Icon color="primary">assignment_turned_in</Icon>
                              </IconButton>
                            </Tooltip>
                          )}
                          {subscriber.estado === 'empaquetado' && (
                            <Tooltip
                              title="Enviar"
                              onClick={() => handleOpenModal(subscriber)}
                            >
                              <IconButton size="large">
                                <Icon color="primary">local_shipping</Icon>
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="Documentos">
                            <IconButton onClick={handleClickMenu} size="large">
                              <Icon color="primary">description</Icon>
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
              count={orders?.length}
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
      )}
      {!isLoading && isError && (
        <MatxSnackbar
          open={isError}
          title={'Error'}
          message={<>Sucedió algo inesperado intentelo nuevamente</>}
          handleClose={handleClose}
        />
      )}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
      >
        <MenuItem>Guia de remisión</MenuItem>
        <MenuItem>Comprobante de pago</MenuItem>
      </Menu>
      <SendOrderModal
        open={orderModal}
        handleClose={handleCloseModal}
        handleAction={sendOrder}
        order={orderSelected}
      />
    </>
  )
}

export default SendOrder
