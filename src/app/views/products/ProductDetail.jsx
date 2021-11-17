import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {
  Breadcrumb,
  SimpleCard,
  MaxtBackdrop,
  MatxSnackbar,
} from 'app/components'
import {
  Button,
  TextField,
  Grid
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles';
import { useHistory, useLocation } from 'react-router'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { useForm, Controller } from 'react-hook-form'

const apiUrl = 'http://localhost:5000/api'

const useStyles = makeStyles(({ palette, ...theme }) => ({
  iconSucces: {
    color: palette.success.light,
    marginLeft: '.5rem',
  },
}))

const ProductDetail = () => {
   const classes = useStyles()
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [product, setProduct] = useState(null);
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search)
  const isEditable  = searchParams.get('isEditable')
  const productCode = searchParams.get('codigo');
  
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm()

  console.log('isEditable: ',isEditable);
  console.log('search: ',search);
  useEffect(() => {
    axios
      .get(`${apiUrl}/productos/getById/${productCode}`, {
        id: productCode,
      })
      .then(
        (response) => {
          console.log('response in pd:',response);
          setProduct(response.data)
          setIsLoading(false)
        },
        (error) => {
          setIsLoading(false)
          setIsError(true)
          setErrorMessage('Sucedió algo inesperado')
        }
      )
  }, [productCode])

  const handleBackTo = () => {
    history.push('/producto/listar')
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setIsError(false)
  }

  const handleSaveGuide = () => {
    if (productCode) {
      setIsLoading(true)
     
      const data = {
        //data
      }
      axios.post('http://localhost:5000/api/productos/createProducto', data).then(
        (response) => {
          history.push('/producto/listar')
        },
        (error) => {
          setIsLoading(false)
        }
      )
    } else {
      setIsError(true)
      setErrorMessage('error')
    }
  }

  return <>
    <MaxtBackdrop isOpen={isLoading} />
    {!isLoading && productCode && product &&(
      <>
            { 
              isEditable ==="false" && (
              <>
              <div className="m-sm-30">
                <div className="mb-sm-30">
                  <Breadcrumb
                    routeSegments={[
                      { name: 'Listar Producto', path: '/producto/listar' },
                      { name: 'Producto: ' + product?.producto.SKU},
                    ]}
                  />
                </div>
                <div className="mb-sm-30">
                  <SimpleCard title={'Datos del producto'}>
                        <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                disabled
                                className="mb-5"
                                fullWidth
                                value={product?.producto.SKU + ' '}
                                size="small"
                                variant="outlined"
                                id="standard-error"
                                label="SKU"
                                readOnly
                            />
                            <TextField
                                disabled
                               
                                fullWidth
                                value={product?.producto.precio + ' '}
                                size="small"
                                variant="outlined"
                                id="standard-error"
                                label="Precio"
                                readOnly
                            />
                            
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                disabled
                                className="mb-5"
                                fullWidth
                                value={product?.producto.nombre + ' '}
                                size="small"
                                variant="outlined"
                                id="standard-error"
                                label="Nombre"
                                readOnly
                            />
                            <TextField
                                disabled
                                fullWidth
                                value={product?.producto.estado + ' '}
                                size="small"
                                variant="outlined"
                                id="standard-error"
                                label="Estado"
                            />
                            </Grid>
                        </Grid>
                        <div>
                          <br/>
                          <h5>Imagenes</h5>
                          <ImageList sx={{ width: 700, height: 300 }} cols={3} rowHeight={160}>
                            {product?.producto.imagenes.map((item) => (
                              <ImageListItem key={item}>
                                <img
                                  src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                  srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                  loading="lazy"
                                  />
                              </ImageListItem>
                            ))}
                          </ImageList>
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
                    </Grid>
                  </SimpleCard>
                </div>
              </div>
              </>
              )
            }

            {
              isEditable ==="true" && (
              <>
              <div className="m-sm-30">
                <div className="mb-sm-30">
                  <Breadcrumb
                    routeSegments={[
                      { name: 'Listar Producto', path: '/producto/listar' },
                      { name: 'Producto: ' + product?.producto.SKU},
                    ]}
                  />
                </div>
                <div className="mb-sm-30">
                  <SimpleCard title={'Datos del producto'}>
                        <Grid container spacing={3}>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Controller
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  error={!!errors.sku}
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  label="SKU"
                                  helperText={errors.sku?.message}
                                  value={product.producto.SKU}
                                />
                              )}
                              name="SKU"
                              control={control}
                              rules={{
                                required: 'Campo requerido',
                              }}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Controller
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  error={!!errors.name}
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  label="Nombre"
                                  helperText={errors.name?.message}
                                  value={product?.producto.nombre}
                                />
                              )}
                              name="Nombre"
                              control={control}
                              rules={{
                                required: 'Campo requerido',
                              }}
                            />
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
                                  label="Precio"
                                  helperText={errors.quantity?.message}
                                  value={product?.producto.precio}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Controller
                              name="cost"
                              control={control}
                              rules={{
                                required: 'Campo requerido',
                                min: {
                                  value: 1,
                                  message: 'Costo min. 1',
                                },
                              }}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  error={!!errors.cost}
                                  fullWidth
                                  type="number"
                                  size="small"
                                  variant="outlined"
                                  label="Costo"
                                  helperText={errors.cost?.message}
                                  value={product?.producto.estado + ' '}
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
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
                    </Grid>
                  </SimpleCard>
                </div>
              </div>
              </>
              )
            }
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
  </>;
}

export default ProductDetail
