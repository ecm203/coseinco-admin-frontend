import React, { useEffect, useState } from 'react'
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
} from '@material-ui/core'
import ReferralGuide from './ReferralGuide'
import axios from 'axios'
import { useHistory } from 'react-router'

const apiUrl = 'http://localhost:5000/api'

const BookOrder = () => {
  const history = useHistory()
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [referralGuideOpen, setReferralGuideOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [orders, setOrders] = useState(null)

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

  const handleOrderDetailOpen = (id) => {
    history.push(`/pedidos/?codigo=${id}&serialNumber=false`)
  }

  const handleReferralGuideOpen = () => {
    setReferralGuideOpen(true)
  }

  const handleReferralGuideClose = () => {
    setReferralGuideOpen(false)
  }

  const handleAddSerialNumbOpen = (id) => {
    history.push(`/pedidos/?codigo=${id}&serialNumber=true`)
  }

  useEffect(() => {
    axios.get(`${apiUrl}/pedidos/admin/reservas`).then(
      (response) => {
        setOrders(response.data.pedidosres)
        setIsLoading(false)
      },
      (error) => {
        setIsLoading(false)
        setIsError(true)
      }
    )
  }, [])

  return (
    <>
      <MaxtBackdrop isOpen={isLoading} />
      {!isLoading && !isError && (
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
                          <Tooltip title="Visualizar pedido">
                            <IconButton
                              onClick={() =>
                                handleOrderDetailOpen(subscriber.codigo)
                              }
                            >
                              <Icon color="primary">visibility</Icon>
                            </IconButton>
                          </Tooltip>
                          {subscriber.estado === 'reservado' && (
                            <Tooltip title="Generar guia de remision">
                              <IconButton onClick={handleReferralGuideOpen}>
                                <Icon color="primary">assignment</Icon>
                              </IconButton>
                            </Tooltip>
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
            <ReferralGuide
              open={referralGuideOpen}
              handleClose={handleReferralGuideClose}
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
    </>
  )
}

export default BookOrder
