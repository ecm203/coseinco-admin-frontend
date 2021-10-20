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
  }, [])

  const loadTableData = () => {
    setOrderList(null)
    setIsLoading(true)
    axios.get(`${apiUrl}/oCompra`).then(
      (response) => {
        console.log(response)
        setOrderList(response.data.compras)
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

  return (
    <>
      <MaxtBackdrop isOpen={isLoading} />
      {!isLoading && !isError && (
        <div className="m-sm-30">
          <div className="mb-sm-30">
            <Breadcrumb routeSegments={[{ name: 'Listar' }]} />
          </div>
          <SimpleCard title={`${orderList.length} ordenes de compra`}>
            <Table className="whitespace-pre">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={1} className="px-0">Codigo</TableCell>
                  <TableCell colSpan={3} className="px-0">Proveedor</TableCell>
                  <TableCell colSpan={1} className="px-0 pr-6" align="right">Costo</TableCell>
                  <TableCell colSpan={2} className="px-0">Fecha de entrega</TableCell>
                  <TableCell colSpan={1} className="px-0">Estado</TableCell>
                  <TableCell colSpan={2} className="px-0">Accion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={1} className="px-0 capitalize" align="left">
                        {order.numeroOC}
                      </TableCell>
                      <TableCell colSpan={3} className="px-0 capitalize" align="left">
                        {order.proveedor}
                      </TableCell>
                      <TableCell colSpan={1} className="px-0 pr-6" align="right">
                        {'$ ' + order.total}
                      </TableCell>
                      <TableCell colSpan={2} className="px-0 " align="left">
                        {format(new Date(order.fechaEntrega), 'dd/MM/yyyy')}
                      </TableCell>
                      <TableCell colSpan={1} className="px-0 capitalize" align="left">
                        {order.estado}
                      </TableCell>
                      <TableCell colSpan={2} className="px-0">
                        <Tooltip title="Visualizar pedido">
                          <IconButton size="large" onClick={() => handleOrderDetailOpen(order.numeroOC)}>
                            <Icon color="primary">visibility</Icon>
                          </IconButton>
                        </Tooltip>
                        {order.estado === 'Generado' && (
                          <>
                            <Tooltip title="Notificacion a proveedor">
                              <IconButton size="large">
                                <Icon color="primary">email</Icon>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Anular orden de compra">
                              <IconButton size="large">
                                <Icon color="primary">delete</Icon>
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
