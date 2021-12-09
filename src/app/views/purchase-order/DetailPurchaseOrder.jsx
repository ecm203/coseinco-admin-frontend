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
import AddSerialNumber from './AddSerialNumber'

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
  const [productSelected, setProductSelected] = useState(null)

  const [post, setPost] = useState({
    photos: [],
  })
  const [highlight, setHighlight] = useState(false)
  const { photos } = post

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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setIsError(false)
  }

  const handleBackTo = () => {
    history.push('/orden-de-compra/listar')
  }

  const handleSerialNumberOpen = (producto) => {
    setProductSelected(producto)
    setSerialNumberOpen(true)
  }

  const handleSerialNumberClose = () => {
    setSerialNumberOpen(false)
  }

  const handleSaveSerialNumber = (productId, serialNumbers) => {
    const productIndex = order.compra.productos.findIndex(
      (product) => product.productoId === productId
    )
    order.compra.productos[productIndex].serialNumbers = serialNumbers
    console.log(order.compra.productos, serialNumbers)
  }

  const handleSaveGuide = () => {
    const productFiltered = order.compra.productos.filter(
      (product) => product.serialNumbers.length === 0
    )
    if (productFiltered.length === 0 && photos.length > 0) {
      setIsLoading(true)
      axios
        .post(`${apiUrl}/oCompra/guiaRemisionProveedorURL`, {
          file: photos[0].src,
          ncompra: orderCode,
        })
        .then((response) => {
          console.log(response)
          const productos = order.compra.productos.map((product) => ({
            productoID: product.productoId,
            serialNumbers: product.serialNumbers,
          }))
          const data = {
            codigo: order.compra.numeroOC,
            productos: productos,
            guiaProveedor: response.data.url,
          }
          axios.post(`${apiUrl}/oCompra/oCompraToInventario`, data).then(
            (response) => {
              console.log(response)
              history.push('/orden-de-compra/listar')
            },
            (error) => {
              setIsLoading(false)
            }
          )
        })
    } else if (productFiltered.length !== 0) {
      setIsError(true)
      setErrorMessage('Debe asignar todos los números de serie')
    } else if (photos.length === 0) {
      setIsError(true)
      setErrorMessage('Debe subir la guia de remision')
    }
  }

  const handleFileChange = (e) => {
    let files = e.target.files
    console.log(files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    let photosArr = []
    for (let file of files) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', () => {
        let fileObj = {
          name: file.name,
          type: file.type,
          size: file.size,
          src: reader.result,
        }
        photosArr.push(fileObj)
        setPost({
          ...post,
          photos: [...photos, ...photosArr],
        })
      })
    }
  }

  const handleDelete = (e) => {
    let target = e.target.parentElement
    let targetindex = target.dataset.imgindex * 1
    console.log(target, targetindex)
    setPost({
      ...post,
      photos: [
        ...photos.slice(0, targetindex),
        ...photos.slice(targetindex + 1),
      ],
    })
  }

  const handlehighlight = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setHighlight(true)
  }

  const handleunhighlight = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setHighlight(false)
  }

  const handledrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let dt = e.dataTransfer
    let files = dt.files
    setHighlight(false)
    handleFiles(files)
    console.log(files)
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
                  { name: 'Listar', path: '/orden-de-compra/listar' },
                  { name: 'Pedido: ' + orderCode },
                ]}
              />
            </div>
            <div className="mb-sm-30">
              <SimpleCard title={'Datos del proveedor'}>
                <Grid container spacing={3}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      className="mb-5"
                      fullWidth
                      value={order.proveedor.razonSocial}
                      size="small"
                      variant="outlined"
                      id="standard-error"
                      label="Cliente"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      fullWidth
                      value={order.proveedor.telefono + ' '}
                      size="small"
                      variant="outlined"
                      id="standard-error"
                      label="Telefono"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      className="mb-5"
                      fullWidth
                      value={order.proveedor.correo + ' '}
                      size="small"
                      variant="outlined"
                      id="standard-error"
                      label="Correo"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      fullWidth
                      value={order.proveedor.ruc + ' '}
                      size="small"
                      variant="outlined"
                      id="standard-error"
                      label="RUC"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  {isAddSerialNumber === 'true' && (
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <div className="custom-form-group">
                        <div
                          className={
                            highlight
                              ? 'custom-file-drop-area highlight'
                              : 'custom-file-drop-area'
                          }
                          onDragEnter={handlehighlight}
                          onDragOver={handlehighlight}
                          onDragLeave={handleunhighlight}
                          onDrop={handledrop}
                        >
                          <input
                            type="file"
                            name="photos"
                            placeholder="Enter photos"
                            multiple={true}
                            onChange={handleFileChange}
                            id="filephotos"
                          />
                          <label htmlFor="filephotos">
                            Inserte guia de remision
                          </label>
                        </div>
                        <div className={photos.length > 0 ? 'files' : ''}>
                          <ul>
                            {photos.length > 0 &&
                              photos.map((item, index) => (
                                <li key={index}>{item.name}</li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </Grid>
                  )}
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
                      <TableCell className="px-0" align="right" colSpan={1}>
                        Cantidad
                      </TableCell>
                      <TableCell className="pr-5" align="right" colSpan={1}>
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
                        <TableCell colSpan={1} className="px-0" align="left">
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
                        <TableCell className="pr-5" align="right">
                          {'$ ' + subscriber.subtotal}
                        </TableCell>
                        {isAddSerialNumber === 'true' && (
                          <>
                            <TableCell colSpan={1} className="px-0">
                              <Tooltip title="Asignar numero de serie">
                                <IconButton
                                  size="large"
                                  onClick={() =>
                                    handleSerialNumberOpen(subscriber)
                                  }
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
                      onClick={handleSaveGuide}
                    >
                      <span className="capitalize">Guardar</span>
                    </Button>
                  </Grid>
                )}
              </Grid>
            </SimpleCard>
          </div>
          <AddSerialNumber
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

export default DetailPurchaseOrder
