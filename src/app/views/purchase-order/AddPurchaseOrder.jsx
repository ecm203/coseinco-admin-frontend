import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Breadcrumb, SimpleCard, MaxtBackdrop } from 'app/components'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputAdornment,
  TextField,
  Table,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  Slide,
  TableRow,
  Autocomplete,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import EmptyData from 'app/components/icons/EmptyData'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { useHistory } from 'react-router-dom'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const AddPurchaseOrder = () => {
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValue: {
      product: null,
      quantity: 1,
    },
  })

  const {
    control: control2,
    reset: reset2,
    formState: { errors: errror2 },
    handleSubmit: handleSubmit2,
  } = useForm({
    defaultValue: {
      supplier: null,
      date: null,
    },
  })

  const [ordenLista, setOrdenLista] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [products, setProducts] = useState(null)
  const [product, setProduct] = useState('')
  const [suppliers, setSuppliers] = useState(null)

  const history = useHistory()
  const sendData = (data, e) => {
    setOrdenLista([...ordenLista, { ...data }])
    reset({ product: null, quantity: 1 })
    setProduct('')
  }

  const handleSaveOrder = (data) => {
    setIsLoading(true)
    reset2()
    const body = {
      ocompra: {
        productos: ordenLista.map((order) => ({
          id: order.product.id,
          cantidad: order.quantity,
          subtotal: order.quantity * order.product.precioCompra,
        })),
        fechaEntrega: data.date,
        proveedorID: data.supplier._id,
      },
    }
    setConfirmDialog(false)
    axios.post('http://localhost:5000/api-admin/oCompra/create', body).then(
      (response) => {
        history.push('/orden-de-compra/listar')
      },
      (error) => {
        setIsLoading(false)
      }
    )
  }

  useEffect(() => {
    setIsLoading(true)
    const requestOne = axios.get(
      'http://localhost:5000/api/productos/ProductosCompra'
    )
    const requestTwo = axios.get('http://localhost:5000/api-admin/proveedor')
    axios.all([requestOne, requestTwo]).then(
      axios.spread((...responses) => {
        setProducts(responses[0].data.productos)
        setSuppliers(responses[1].data.proveedores)
        setIsLoading(false)
      })
    )
  }, [])

  useEffect(() => {
    !confirmDialog && reset2({ date: null, supplier: null })
  }, [confirmDialog, reset2])

  const handleChangeProduct = (data) => {
    if (data) {
      setProduct(data.precioCompra)
    } else {
      setProduct('')
    }
  }

  const handleOpenModal = () => {
    setConfirmDialog(true)
  }

  const handleCloseModal = () => {
    setConfirmDialog(false)
  }

  return (
    <>
      <MaxtBackdrop isOpen={isLoading} />
      {!isLoading && (
        <>
          <div className="m-sm-30">
            <div className="mb-sm-30">
              <Breadcrumb routeSegments={[{ name: 'Agregar OC' }]} />
            </div>
            <div className="mb-sm-30">
              <SimpleCard title={'Agregar producto'}>
                <form id="produdctForm" onSubmit={handleSubmit(sendData)}>
                  <Grid container spacing={3}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      {products && (
                        <Controller
                          render={({ field }) => (
                            <Autocomplete
                              {...field}
                              id="controlled-demo"
                              options={products}
                              fullWidth
                              getOptionLabel={(option) => option.nombre}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Producto"
                                  variant="outlined"
                                  size="small"
                                  error={!!errors.product}
                                  helperText={errors.product?.message}
                                />
                              )}
                              onChange={(_, data) => {
                                handleChangeProduct(data)
                                return field.onChange(data)
                              }}
                            />
                          )}
                          defaultValue={null}
                          name="product"
                          control={control}
                          rules={{
                            required: 'Campo requerido',
                          }}
                        />
                      )}
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Controller
                        name="quantity"
                        control={control}
                        defaultValue={1}
                        rules={{
                          required: 'Campo requerido',
                          min: {
                            value: 1,
                            message: 'Cantidad min. 1',
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            error={!!errors.quantity}
                            fullWidth
                            type="number"
                            size="small"
                            variant="outlined"
                            label="Cantidad"
                            helperText={errors.quantity?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        value={product}
                        onChange={handleChangeProduct}
                        type="number"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                          readOnly: true,
                        }}
                        size="small"
                        variant="outlined"
                        label="Costo"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Button
                        className="w-full"
                        sx={{ height: '37px' }}
                        color="primary"
                        variant="outlined"
                        type="submit"
                      >
                        Agregar
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </SimpleCard>
            </div>

            <SimpleCard title="Lista de productos">
              <Table className="whitespace-pre">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} className="px-0">
                      Producto
                    </TableCell>
                    <TableCell colSpan={1} align="right">
                      Precio/U
                    </TableCell>
                    <TableCell colSpan={1} align="right">
                      Cantidad
                    </TableCell>
                    <TableCell colSpan={1} align="right" className="pr-2">
                      Subtotal
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ordenLista.length > 0 ? (
                    ordenLista.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell
                          className="px-0 capitalize"
                          colSpan={3}
                          align="left"
                        >
                          <div className="flex items-center">
                            <Avatar src={data.product.imagen} />
                            <p className="m-0 ml-4">{data.product.nombre}</p>
                          </div>
                        </TableCell>
                        <TableCell colSpan={1} align="right">
                          {'$ ' + data.product.precioCompra}
                        </TableCell>
                        <TableCell colSpan={1} align="right">
                          {data.quantity}
                        </TableCell>
                        <TableCell colSpan={1} align="right">
                          {'$ ' + data.product.precioCompra * data.quantity}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell sx={{ p: 0, border: 'none' }} colSpan={6}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            p: 4,
                          }}
                        >
                          <EmptyData
                            color="action"
                            sx={{ width: '64px', height: 'auto', mb: 2 }}
                          />
                          <Typography color="GrayText" variant="subtitle1">
                            {' '}
                            No hay información para mostrar{' '}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {ordenLista.length > 0 && (
                <Box sx={{ ml: 'auto', mt: 4, width: '300px' }}>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    type="button"
                    onClick={handleOpenModal}
                  >
                    Registrar orden de compra
                  </Button>
                </Box>
              )}
            </SimpleCard>
          </div>
          <Dialog
            open={confirmDialog}
            onClose={handleCloseModal}
            TransitionComponent={Transition}
            fullWidth
            maxWidth="xs"
          >
            <form onSubmit={handleSubmit2(handleSaveOrder)}>
              <DialogTitle>Confirmar fecha de entrega</DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ pb: 2 }}>
                  Seleccione la fecha de ingreso y el proveedor correspondiente
                </DialogContentText>

                <Controller
                  control={control2}
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
                        label="Fecha de llegada"
                        inputFormat="dd/MM/yyyy"
                        value={value}
                        minDate={new Date()}
                        onChange={onChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            size={'small'}
                            error={!!errror2.date}
                            helperText={errror2.date?.message}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                />
                <Controller
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      className="mt-5"
                      options={suppliers}
                      fullWidth
                      getOptionLabel={(option) => option.razonSocial}
                      onChange={(_, data) => field.onChange(data)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Proveedor"
                          variant="outlined"
                          size="small"
                          error={!!errror2.supplier}
                          helperText={errror2.supplier?.message}
                        />
                      )}
                    />
                  )}
                  name="supplier"
                  defaultValue={null}
                  control={control2}
                  rules={{
                    required: 'Campo requerido',
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button color="secondary" onClick={handleCloseModal}>
                  Cancelar
                </Button>
                <Button type="submit">Guardar</Button>
              </DialogActions>
            </form>
          </Dialog>
        </>
      )}
    </>
  )
}

export default AddPurchaseOrder
