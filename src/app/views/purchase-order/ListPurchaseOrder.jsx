import React, { useState, useEffect } from 'react'
import {
  Breadcrumb,
  SimpleCard,
  MaxtBackdrop,
  MatxSnackbar,
  ConfirmationDialog,
} from 'app/components'
import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  Menu,
  MenuItem,
  Tooltip,
  TablePagination,
} from '@mui/material'
import { useHistory } from 'react-router'
import axios from 'axios'
import { format } from 'date-fns'

const apiUrl = 'http://localhost:5000/api-admin'

const ListPurchaseOrder = () => {
  const history = useHistory()
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [orderList, setOrderList] = useState(null)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [orderSelected, setOrderSelected] = useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const openMenu = Boolean(anchorEl)

  const handleClickMenu = (event, order) => {
    setOrderSelected(order)
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    history.push('/')
    setIsError(false)
  }

  useEffect(() => {
    loadTableData()
    return () => {
      loadTableData()
    }
  }, [])

  const loadTableData = () => {
    setOrderList(null)
    setIsLoading(true)
    axios.get(`${apiUrl}/oCompra`).then(
      (response) => {
        setOrderList(response.data.compras)
        console.log(response.data.compras)
        setIsLoading(false)
      },
      (error) => {
        setIsLoading(false)
        setIsError(true)
      }
    )
  }

  const handleOrderDetailOpen = (id) => {
    history.push(`/orden-de-compra/?codigo=${id}&serialNumber=false`)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const handleOpenModal = (orderCode) => {
    setIsOpenModal(true)
    setOrderSelected(orderCode)
  }

  const handleDeleteOrder = () => {
    setIsLoading(true)
    axios
      .post(`${apiUrl}/oCompra/anular`, {
        id: orderSelected,
      })
      .then(
        (response) => {
          setIsOpenModal(false)
          loadTableData()
        },
        (error) => {
          setIsOpenModal(false)
        }
      )
  }

  const handleAddSerialNumber = (orderCode) => {
    history.push(`/orden-de-compra/?codigo=${orderCode}&serialNumber=true`)
  }

  const handleSendEmail = (orderCode) => {
    setIsLoading(true)
    axios
      .post(`${apiUrl}/oCompra/oCompraGenerarDoc`, {
        ncompra: orderCode,
      })
      .then(
        (response) => {
          console.log(response)
          loadTableData()
        },
        (error) => {
          setIsLoading(false)
        }
      )
  }

  return (
    <>
      <MaxtBackdrop isOpen={isLoading} />
      {!isLoading && !isError && (
        <>
          <div className="m-sm-30">
            <div className="mb-sm-30">
              <Breadcrumb routeSegments={[{ name: 'Listar' }]} />
            </div>
            <SimpleCard title={`${orderList.length} ordenes de compra`}>
              <Table className="whitespace-pre">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={1} className="px-0">
                      Codigo
                    </TableCell>
                    <TableCell colSpan={3} className="px-0">
                      Proveedor
                    </TableCell>
                    <TableCell colSpan={2} className="px-0 pr-6" align="right">
                      Costo
                    </TableCell>
                    <TableCell colSpan={2} className="px-0">
                      Fecha de entrega
                    </TableCell>
                    <TableCell colSpan={1} className="px-0">
                      Estado
                    </TableCell>
                    <TableCell colSpan={3} className="px-0">
                      Accion
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order, index) => (
                      <TableRow key={index}>
                        <TableCell
                          colSpan={1}
                          className="px-0 capitalize"
                          align="left"
                        >
                          {order.numeroOC}
                        </TableCell>
                        <TableCell
                          colSpan={3}
                          className="px-0 capitalize"
                          align="left"
                        >
                          {order.proveedor}
                        </TableCell>
                        <TableCell
                          colSpan={2}
                          className="px-0 pr-6"
                          align="right"
                        >
                          {'$ ' + order.total}
                        </TableCell>
                        <TableCell colSpan={2} className="px-0 " align="left">
                          {order.estado === 'cotizado' &&
                          !order.cotizacionAccept
                            ? 'Por confirmar'
                            : format(
                                new Date(order.fechaEntrega),
                                'dd/MM/yyyy'
                              )}
                        </TableCell>
                        <TableCell
                          colSpan={1}
                          className="px-0 capitalize"
                          align="left"
                        >
                          {order.estado}
                        </TableCell>
                        <TableCell colSpan={3} className="px-0">
                          <Tooltip title="Visualizar pedido">
                            <IconButton
                              size="large"
                              onClick={() =>
                                handleOrderDetailOpen(order.numeroOC)
                              }
                            >
                              <Icon color="primary">visibility</Icon>
                            </IconButton>
                          </Tooltip>
                          {order.estado === 'cotizado' &&
                            order.cotizacionAccept && (
                              <>
                                <Tooltip title="Generar OC">
                                  <IconButton
                                    size="large"
                                    onClick={() =>
                                      handleSendEmail(order.numeroOC)
                                    }
                                  >
                                    <Icon color="primary">email</Icon>
                                  </IconButton>
                                </Tooltip>
                                {/* <Tooltip title="Anular orden de compra">
                                <IconButton
                                  size="large"
                                  onClick={() =>
                                    handleOpenModal(order.numeroOC)
                                  }
                                >
                                  <Icon color="primary">delete</Icon>
                                </IconButton>
                              </Tooltip> */}
                              </>
                            )}
                          {order.estado === 'procesado' &&
                            format(
                              new Date(order.fechaEntrega),
                              'dd/MM/yyyy'
                            ) === format(new Date(), 'dd/MM/yyyy') && (
                              <Tooltip title="Asignar numero de serie">
                                <IconButton
                                  size="large"
                                  onClick={() =>
                                    handleAddSerialNumber(order.numeroOC)
                                  }
                                >
                                  <Icon color="primary">add_circle</Icon>
                                </IconButton>
                              </Tooltip>
                            )}
                          {(order.estado === 'procesado' ||
                            order.estado === 'finalizado') && (
                            <Tooltip title="Documentos">
                              <IconButton
                                onClick={(event) =>
                                  handleClickMenu(event, order)
                                }
                                size="large"
                              >
                                <Icon color="primary">description</Icon>
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={orderList.length}
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
          <ConfirmationDialog
            open={isOpenModal}
            onConfirmDialogClose={handleCloseModal}
            onYesClick={handleDeleteOrder}
            title={'Anular orden de compra'}
            text={'Esta seguro que desear eliminar esta orden de compra'}
          />
          {orderSelected && (
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
              <MenuItem>
                <a
                  href={orderSelected.url}
                  download={true}
                  rel="noreferrer"
                  target="_blank"
                >
                  Orden de compra
                </a>
              </MenuItem>
              {orderSelected.estado === 'finalizado' && (
                <MenuItem>
                  <a
                    href={orderSelected.guiaProveedor}
                    download={true}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Guia de remision
                  </a>
                </MenuItem>
              )}
            </Menu>
          )}
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

export default ListPurchaseOrder
