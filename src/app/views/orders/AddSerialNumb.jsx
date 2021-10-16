import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Breadcrumb,
  SimpleCard,
  MaxtBackdrop,
  MatxSnackbar,
} from 'app/components'
import {
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
} from '@material-ui/core'
import SerialNumber from './SerialNumber'
import { useHistory, useLocation } from 'react-router'

const apiUrl = 'http://localhost:5000/api'

const AddSerialNumb = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
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

  useEffect(() => {
    console.log(orderCode)
    axios
      .post(`${apiUrl}/pedidos/getPedidoReservabyID`, {
        id: orderCode,
      })
      .then(
        (response) => {
          setOrder(response.data)
          console.log(response.data)
          setIsLoading(false)
        },
        (error) => {
          setIsLoading(false)
          setIsError(true)
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
    history.push('/')
    setIsError(false)
  }

  return (
    <>
      <MaxtBackdrop isOpen={isLoading} />
      {!isLoading && !isError && (
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
              <Table className="whitespace-pre">
                <TableHead>
                  <TableRow>
                    <TableCell className="px-0">Producto</TableCell>
                    <TableCell className="px-0">Cantidad</TableCell>
                    <TableCell className="px-0">Precio/U</TableCell>
                    <TableCell className="px-0">Subtotal</TableCell>
                    {isAddSerialNumber === 'true' && (
                      <TableCell className="px-0">Acciones</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order?.productos.map((subscriber, index) => (
                    <TableRow key={index}>
                      <TableCell className="px-0 capitalize" align="left">
                        {subscriber.nombre}
                      </TableCell>
                      <TableCell className="px-0 capitalize" align="left">
                        {subscriber.cantidad}
                      </TableCell>
                      <TableCell className="px-0 capitalize" align="left">
                        {subscriber.preciounitario}
                      </TableCell>
                      <TableCell className="px-0 capitalize" align="left">
                        {subscriber.subtotal}
                      </TableCell>
                      {isAddSerialNumber === 'true' && (
                        <TableCell className="px-0">
                          <Tooltip title="Completar campos vacios">
                            <IconButton color="secondary">
                              <Icon className="">cancel</Icon>
                            </IconButton>
                          </Tooltip>
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
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                    <Button fullWidth color="primary" variant="contained">
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
          />
        </>
      )}
      {!isLoading && isError && (
        <MatxSnackbar
          open={isError}
          title={'Error'}
          message={
            <>
              Sucedió algo inesperado
            </>
          }
          handleClose={handleClose}
        />
      )}
    </>
  )
}

export default AddSerialNumb
