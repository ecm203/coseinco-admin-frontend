import React, { useEffect, useState } from 'react'
import { Breadcrumb, SimpleCard, MaxtBackdrop } from 'app/components'
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
} from '@material-ui/core'
import OrderDetail from './OrderDetail'
import ReferralGuide from './ReferralGuide'
import axios from 'axios'
import { useHistory } from 'react-router'

const apiUrl = 'http://localhost:5000/api'

const BookOrder = () => {
  const history = useHistory()
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [isLoading, setIsLoading] = useState(true)
  const [orderDialogOpen, setOrderDialogOpen] = useState(false)
  const [referralGuideOpen, setReferralGuideOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [orders, setOrders] = useState(null)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleOrderDetailOpen = () => {
    setOrderDialogOpen(true)
  }

  const handleOrderDetailClose = () => {
    setOrderDialogOpen(false)
  }

  const handleReferralGuideOpen = () => {
    setReferralGuideOpen(true)
  }

  const handleReferralGuideClose = () => {
    setReferralGuideOpen(false)
  }

  const handleAddSerialNumbOpen = (id) => {
    history.push(`/pedidos/id/${id}`)
  }

  useEffect(() => {
    axios.get(`${apiUrl}/pedidos/admin/reservas`).then(
      (response) => {
        setOrders(response.data.pedidosres)
        setIsLoading(false)
      },
      (error) => {
        setIsLoading(false)
      }
    )
  }, [])

  return (
    <>
      <MaxtBackdrop isOpen={isLoading} />
      {!isLoading && (
        <div className="m-sm-30">
          <div className="mb-sm-30">
            <Breadcrumb routeSegments={[{ name: 'Reservar pedido' }]} />
          </div>
          <SimpleCard title={`${orders?.length} pedidos registrados`}>
            <Table className="whitespace-pre">
              <TableHead>
                <TableRow>
                  <TableCell className="px-0">ID Pedido</TableCell>
                  <TableCell className="px-0">Nombres y apellidos</TableCell>
                  <TableCell className="px-0">Cantidad</TableCell>
                  <TableCell className="px-0">Estado</TableCell>
                  <TableCell className="px-0">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders &&
                  orders
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((subscriber, index) => (
                      <TableRow key={index}>
                        <TableCell className="px-0 capitalize" align="left">
                          {subscriber.codigo}
                        </TableCell>
                        <TableCell className="px-0 capitalize" align="left">
                          {subscriber.cliente.name +
                            ' ' +
                            subscriber.cliente.lastName}
                        </TableCell>
                        <TableCell className="px-0 capitalize" align="left">
                          {subscriber.cantidad}
                        </TableCell>
                        <TableCell className="px-0 capitalize" align="left">
                          {subscriber.estado}
                        </TableCell>
                        <TableCell className="px-0">
                          {subscriber.estado === 'reservado' && (
                            <>
                              <Tooltip title="Descargar guia de remision">
                                <IconButton>
                                  <Icon color="primary">download</Icon>
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Generar guia de remision">
                                <IconButton onClick={handleReferralGuideOpen}>
                                  <Icon color="primary">assignment</Icon>
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          {(subscriber.estado === 'empaquetado' ||
                            subscriber.estado === 'enviado' ||
                            subscriber.estado === 'finalizado') && (
                            <Tooltip title="Descargar guia de remision">
                              <IconButton>
                                <Icon color="primary">download</Icon>
                              </IconButton>
                            </Tooltip>
                          )}
                          {subscriber.estado === 'generado' && (
                            <>
                              <Tooltip title="Visualizar pedido">
                                <IconButton onClick={handleOrderDetailOpen}>
                                  <Icon color="primary">visibility</Icon>
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Asignar numero de serie">
                                <IconButton
                                  onClick={() =>
                                    handleAddSerialNumbOpen(subscriber.codigo)
                                  }
                                >
                                  <Icon color="primary">add_circle</Icon>
                                </IconButton>
                              </Tooltip>
                            </>
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
              count={orders?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <OrderDetail
              open={orderDialogOpen}
              handleClose={handleOrderDetailClose}
            />
            <ReferralGuide
              open={referralGuideOpen}
              handleClose={handleReferralGuideClose}
            />
          </SimpleCard>
        </div>
      )}
    </>
  )
}

export default BookOrder
