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
} from '@mui/material'
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
  const [codeSelected, setCodeSelected] = useState(null)

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

  const handleReferralGuideOpen = (code) => {
    setReferralGuideOpen(true)
    setCodeSelected(code)
  }

  const handleReferralGuideClose = () => {
    setReferralGuideOpen(false)
  }

  const handleAddSerialNumbOpen = (id) => {
    history.push(`/pedidos/?codigo=${id}&serialNumber=true`)
  }

  useEffect(() => {
    loadTableData()
  }, [])

  const loadTableData = () => {
    setOrders(null)
    setIsLoading(true)
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
  }

  const generateRG = async (orderCode) => {
    setIsLoading(true)
    await axios
      .post('http://localhost:5000/api-admin/guia/createGuiaPDF', {
        codigo: orderCode,
      })
      .then(
        (response) => {
          console.log(response)
          loadTableData()
        },
        (error) => {
          setIsLoading(false)
          setIsError(true)
        }
      )
    loadTableData()
  }

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
                  <TableCell colSpan={1} className="px-0">
                    ID Pedido
                  </TableCell>
                  <TableCell colSpan={4} className="px-0">
                    Nombres y apellidos
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
                          colSpan={4}
                          className="px-0 capitalize"
                          align="left"
                        >
                          {subscriber.cliente.name +
                            ' ' +
                            subscriber.cliente.lastName}
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
                            <IconButton
                              onClick={() =>
                                handleOrderDetailOpen(subscriber.codigo)
                              }
                              size="large"
                            >
                              <Icon color="primary">visibility</Icon>
                            </IconButton>
                          </Tooltip>
                          {subscriber.estado === 'reservado' && (
                            <Tooltip title="Generar guia de remision">
                              <IconButton
                                onClick={() =>
                                  handleReferralGuideOpen(subscriber.codigo)
                                }
                                size="large"
                              >
                                <Icon color="primary">assignment</Icon>
                              </IconButton>
                            </Tooltip>
                          )}
                          {(subscriber.estado === 'empaquetado' ||
                            subscriber.estado === 'enviado' ||
                            subscriber.estado === 'finalizado') && (
                            <Tooltip title="Descargar guia de remision">
                              <a href={subscriber.url} download rel="noreferrer" target="_blank"> 
                                <IconButton size="large">
                                  <Icon color="primary">download</Icon>
                                </IconButton>
                              </a>
                            </Tooltip>
                          )}
                          {subscriber.estado === 'generado' && (
                            <>
                              <Tooltip title="Asignar numero de serie">
                                <IconButton
                                  onClick={() =>
                                    handleAddSerialNumbOpen(subscriber.codigo)
                                  }
                                  size="large"
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
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <ReferralGuide
              open={referralGuideOpen}
              orderCode={codeSelected}
              generateRG={generateRG}
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
