import React, { useState, useEffect } from 'react'
import { SimpleCard, MaxtBackdrop, MatxSnackbar } from 'app/components'
import { useLocation } from 'react-router'
import {
  Avatar,
  Button,
  Box,
  TextField,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

const apiUrl = 'http://localhost:5000/api-admin'

const SupplierPurchaseOrder = () => {
  const { search } = useLocation()
  const [order, setOrder] = useState(null)
  const searchParams = new URLSearchParams(search)
  const orderCode = searchParams.get('codigo')
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [orderSave, setOrderSave] = useState(null)

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValue: {
      date: null,
    },
  })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setIsError(false)
  }

  const handleSaveOrder = (data) => {
    setIsLoading(true)
    axios
      .post('http://localhost:5000/api-admin/oCompra/oCompraAcceptByProv', {
        
      
      })
      .then(
        (response) => {
          console.log(response)
          setIsLoading(false)
          setOrderSave(true)
        },
        (error) => {
          setIsLoading(false)
        }
      )
  }

  useEffect(() => {
    axios.get(`${apiUrl}/oCompra/getById/${orderCode}`).then(
      (response) => {
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

  return (
    <>
      <MaxtBackdrop isOpen={isLoading} />
      {!isLoading && order && !orderSave && (
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '70%' }}>
            <SimpleCard
              hfull={false}
              title={`Orden de compra Nro. ${orderCode}`}
            >
              <form onSubmit={handleSubmit(handleSaveOrder)}>
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
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Controller
                      control={control}
                      name="date"
                      rules={{
                        required: 'Campo requerido',
                      }}
                      defaultValue={null}
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState: { invalid, isTouched, isDirty, error },
                        formState,
                      }) => (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker
                            label="Ingrese la fecha de entrega del pedido"
                            inputFormat="dd/MM/yyyy"
                            value={value}
                            minDate={new Date()}
                            onChange={onChange}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                size={'small'}
                                error={!!errors.date}
                                helperText={errors.date?.message}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      )}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Button
                      sx={{ height: '100%' }}
                      fullWidth
                      color="primary"
                      variant="contained"
                      type="submit"
                    >
                      Procesar
                    </Button>
                  </Grid>
                  <Grid
                    sx={{ overflowX: 'auto' }}
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                  >
                    <Table className={'whitespace-pre min-w-600'}>
                      <TableHead>
                        <TableRow>
                          <TableCell className="px-0" colSpan={1}>
                            SKU
                          </TableCell>
                          <TableCell className="px-0" colSpan={4}>
                            Producto
                          </TableCell>
                          <TableCell className="px-0" align="right" colSpan={1}>
                            Cantidad
                          </TableCell>
                          <TableCell className="pr-5" align="right" colSpan={1}>
                            Subtotal
                          </TableCell>
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
                              className="px-0"
                              align="left"
                            >
                              {subscriber.cantidad}
                            </TableCell>
                            <TableCell className="pr-5" align="right">
                              {'$ ' + subscriber.subtotal}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </form>
            </SimpleCard>
          </Box>
        </Box>
      )}
      {!isLoading && isError && !orderSave && (
        <MatxSnackbar
          open={isError}
          title={'Error'}
          message={errorMessage}
          handleClose={handleClose}
          duration={3000}
        />
      )}
      {!isLoading && order && orderSave && (
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '70%' }}>
            <Typography sx={{ textAlign: 'center' }} variant="h3">
              Orden de compra actualizada
            </Typography>
          </Box>
        </Box>
      )}
    </>
  )
}

export default SupplierPurchaseOrder
