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
} from '@material-ui/core'
import SerialNumber from './SerialNumber'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, useLocation } from 'react-router'
import clsx from 'clsx'

const apiUrl = 'http://localhost:5000/api'

const useStyles = makeStyles(({ palette, ...theme }) => ({
  iconSucces: {
    color: palette.success.main,
    marginLeft: '.5rem',
  },
}))

const AddSerialNumb = () => {
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [serialNumber, setSerialNumberOpen] = useState(false)
  const [order, setOrder] = useState(null)
  const [productSelected, setProductSelected] = useState(null)
  const history = useHistory()
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const orderCode = searchParams.get('codigo')
  const isAddSerialNumber = searchParams.get('serialNumber')

  const handleSerialNumberOpen = (producto) => {
    setProductSelected(producto)
    setSerialNumberOpen(true)
  }

  const handleSerialNumberClose = () => {
    setSerialNumberOpen(false)
  }

  const handleSaveSerialNumber = (productId, serialNumbers) => {
    const productIndex = order.productos.findIndex(
      (product) => product.productoID === productId
    )
    order.productos[productIndex].serialNumbers = serialNumbers
  }

  useEffect(() => {
    axios
      .post(`${apiUrl}/pedidos/getPedidoReservabyID`, {
        id: orderCode,
      })
      .then(
        (response) => {
          response.data.productos.map((product) => (product.serialNumbers = []))
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

  const handleBackTo = () => {
    history.push('/pedidos/reservar')
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setIsError(false)
  }

  const handleSaveGuide = () => {
    const productFiltered = order.productos.filter(
      (product) => product.serialNumbers.length === 0
    )
    if (productFiltered.length === 0) {
      setIsLoading(true)
      const productos = order.productos.map((product) => ({
        productoID: product.productoID,
        serialNumbers: product.serialNumbers,
      }))
      const data = {
        codigo: order.pedido.codigoPedido,
        productos: productos,
      }
      axios.post('http://localhost:5000/api-admin/guia/createGuia', data).then(
        (response) => {
          console.log(response)
          // setIsLoading(false)
          history.push('/pedidos/reservar')
        },
        (error) => {
          setIsLoading(false)
        }
      )
    } else {
      setIsError(true)
      setErrorMessage('Debe asignar todos los números de serie')
    }
  }

  return (
    <>
      <MaxtBackdrop isOpen={isLoading} />
      {!isLoading && order && (
        <>
          <div className="m-sm-30">
            <div className="mb-sm-30">
              <Breadcrumb
                routeSegments={[
                  { name: 'Reservar pedido', path: '/pedidos/reservar' },
                  { name: 'Pedido: ' + orderCode },
                ]}
              />
            </div>
            <div className="mb-sm-30">
              <SimpleCard title={'Datos del cliente'}>
                <Grid container spacing={3}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      disabled
                      className="mb-5"
                      fullWidth
                      value={
                        order?.pedido.datos.name +
                        ' ' +
                        order?.pedido.datos.lastName
                      }
                      size="small"
                      variant="outlined"
                      id="standard-error"
                      label="Cliente"
                      readOnly
                    />
                    <TextField
                      disabled
                      fullWidth
                      value={order?.pedido.datos.phoneNumber + ' '}
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
                      value={order?.pedido.datos.email + ' '}
                      size="small"
                      variant="outlined"
                      id="standard-error"
                      label="Correo"
                      readOnly
                    />
                    <TextField
                      disabled
                      fullWidth
                      value={order?.pedido.datos.address + ' '}
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
                    {order?.productos.map((subscriber, index) => (
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
                          <Box display="flex" alignItems="center" justifyContent="end">
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
                        {isAddSerialNumber === 'true' && (
                          <>
                            <TableCell colSpan={1} className="px-0">
                              <Tooltip title="Asignar numero de serie">
                                <IconButton
                                  onClick={() => {
                                    handleSerialNumberOpen(subscriber)
                                  }}
                                >
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
                justify="flex-end"
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
                      onClick={handleSaveGuide}
                    >
                      <span className="capitalize">Guardar</span>
                    </Button>
                  </Grid>
                )}
              </Grid>
            </SimpleCard>
          </div>
          <SerialNumber
            product={productSelected}
            open={serialNumber}
            handleClose={handleSerialNumberClose}
            handleSaveSn={handleSaveSerialNumber}
          />
        </>
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

export default AddSerialNumb
