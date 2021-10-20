import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Breadcrumb,
  SimpleCard,
  MaxtBackdrop,
  MatxSnackbar,
} from 'app/components'
import {
  Avatar,
  Button,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
  Icon,
  Grid,
  Box,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { useHistory, useLocation } from 'react-router'
import clsx from 'clsx'

const apiUrl = 'http://localhost:5000/api-admin'
const useStyles = makeStyles(({ palette, ...theme }) => ({
  iconSucces: {
    color: palette.success.light,
    marginLeft: '.5rem',
  },
}))

const DetailPurchaseOrder = () => {
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [serialNumber, setSerialNumberOpen] = useState(false)
  const [order, setOrder] = useState(null)
  const history = useHistory()
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const orderCode = searchParams.get('codigo')
  const isAddSerialNumber = searchParams.get('serialNumber')

  useEffect(() => {
    axios.get(`${apiUrl}/oCompra/getById/${orderCode}`).then(
      (response) => {
        console.log(response.data)
        response.data.compra.productos.map(
          (product) => (product.serialNumbers = [])
        )
        setOrder(response.data)
        setIsLoading(false)
      },
      (error) => {
        setIsLoading(false)
        setIsError(true)
        setErrorMessage('Sucedió algo inesperado')
      }
    )
  }, [orderCode])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setIsError(false)
  }

  const handleBackTo = () => {
    history.push('/orden-de-compra/listar')
  }

  return (
    <>
      <MaxtBackdrop isOpen={isLoading} />
      {!isLoading && order && (
        <div className="m-sm-30">
          <div className="mb-sm-30">
            <Breadcrumb
              routeSegments={[
                { name: 'Listar', path: '/orden-de-compra/listar' },
                { name: 'Pedido: ' + orderCode },
              ]}
            />
          </div>
          {console.log(order)}
          <div className="mb-sm-30">
            <SimpleCard title={'Datos del proveedor'}>
              <Grid container spacing={3}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    disabled
                    className="mb-5"
                    fullWidth
                    value={order.proveedor.razonSocial}
                    size="small"
                    variant="outlined"
                    id="standard-error"
                    label="Cliente"
                    readOnly
                  />
                  <TextField
                    disabled
                    fullWidth
                    value={order.proveedor.telefono + ' '}
                    size="small"
                    variant="outlined"
                    id="standard-error"
                    label="Telefono"
                    readOnly
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    disabled
                    className="mb-5"
                    fullWidth
                    value={order.proveedor.correo + ' '}
                    size="small"
                    variant="outlined"
                    id="standard-error"
                    label="Correo"
                    readOnly
                  />
                  <TextField
                    disabled
                    fullWidth
                    value={order.proveedor.ruc + ' '}
                    size="small"
                    variant="outlined"
                    id="standard-error"
                    label="Direccion"
                  />
                </Grid>
              </Grid>
            </SimpleCard>
          </div>
          <SimpleCard title={'Productos'}>
            <div className="overflow-auto">
              <Table className={'whitespace-pre min-w-600'}>
                <TableHead>
                  <TableRow>
                    <TableCell className="px-0" colSpan={1}>
                      SKU
                    </TableCell>
                    <TableCell className="px-0" colSpan={4}>
                      Producto
                    </TableCell>
                    <TableCell className="pr-5" align="right" colSpan={1}>
                      Cantidad
                    </TableCell>
                    <TableCell align="right" colSpan={1}>
                      Subtotal
                    </TableCell>
                    {isAddSerialNumber === 'true' && (
                      <>
                        <TableCell className="px-0" colSpan={1}>
                          Acciones
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.compra.productos.map((subscriber, index) => (
                    <TableRow key={index}>
                      <TableCell
                        colSpan={1}
                        className="px-0 capitalize"
                        align="left"
                      >
                        {subscriber.SKU}
                      </TableCell>
                      <TableCell colSpan={4} className="px-0 pr-3">
                        <div className="flex items-center">
                          <Avatar src={subscriber.imagen} />
                          <p className="m-0 ml-4">{subscriber.nombre}</p>
                        </div>
                      </TableCell>
                      <TableCell
                        colSpan={1}
                        className="px-0 pr-5 capitalize"
                        align="left"
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="end"
                        >
                          {subscriber.cantidad}
                          {subscriber.serialNumbers.length === 0 &&
                            isAddSerialNumber === 'true' && (
                              <Tooltip title="Debe asignar los S/N del producto">
                                <Icon className="ml-2" color="error">
                                  error
                                </Icon>
                              </Tooltip>
                            )}
                          {subscriber.serialNumbers.length > 0 &&
                            isAddSerialNumber === 'true' && (
                              <Tooltip title="Números de serie asignados">
                                <Icon
                                  className={clsx(classes.iconSucces, 'ml-2')}
                                >
                                  check_circle
                                </Icon>
                              </Tooltip>
                            )}
                        </Box>
                      </TableCell>
                      <TableCell className="px-0" align="right">
                        {'$ ' + subscriber.subtotal}
                      </TableCell>
                      {isAddSerialNumber === 'true' && (
                        <>
                          <TableCell colSpan={1} className="px-0">
                            <Tooltip title="Asignar numero de serie">
                              <IconButton size="large">
                                <Icon color="primary">assignment</Icon>
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Grid
              container
              spacing={3}
              className="pt-sm-24"
              justifyContent="flex-end"
            >
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <Button
                  fullWidth
                  color="secondary"
                  variant="outlined"
                  onClick={handleBackTo}
                >
                  <span className="capitalize">Volver</span>
                </Button>
              </Grid>
              {isAddSerialNumber === 'true' && (
                <Grid item lg={3} md={3} sm={12} xs={12}>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    type="button"
                  >
                    <span className="capitalize">Guardar</span>
                  </Button>
                </Grid>
              )}
            </Grid>
          </SimpleCard>
        </div>
      )}
      {!isLoading && isError && (
        <MatxSnackbar
          open={isError}
          title={'Error'}
          message={errorMessage}
          handleClose={handleClose}
          duration={3000}
        />
      )}
    </>
  )
}

export default DetailPurchaseOrder
