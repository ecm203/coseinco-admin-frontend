import React,{useEffect, useState} from 'react';
import axios from 'axios';
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
import makeStyles from '@mui/styles/makeStyles';
import { useHistory, useLocation } from 'react-router'

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
                            <TextField
                                fullWidth
                                 className="mb-5"
                                value={product?.producto.SKU + ' '}
                                size="small"
                                variant="outlined"
                                id="standard-error"
                                label="SKU"
                                readOnly
                            />
                            <TextField
                               
                                fullWidth
                                value={product?.producto.precio}
                                size="small"
                                variant="outlined"
                                id="standard-error"
                                label="Precio"
                            />
                            
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                className="mb-5"
                                fullWidth
                                value={product?.producto.nombre}
                                size="small"
                                variant="outlined"
                                id="standard-error"
                                label="Nombre"
                                
                            />
                            <TextField
                                fullWidth
                                value={product?.producto.estado + ' '}
                                size="small"
                                variant="outlined"
                                id="standard-error"
                                label="Estado"
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
