import React, {useState, useEffect}from 'react';
import {
  Breadcrumb,
  SimpleCard,
  MaxtBackdrop,
 MatxSnackbar      
} from 'app/components';
import {
  Avatar,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
  Icon,
  Grid,
} from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router'


const productos = [
  {
    SKU: '01112',
    nombre: 'Prueba 1',
    precio: "99",
    estado: 'habilitado',
    imagen:'https://res.cloudinary.com/dzsitpxzw/image/upload/v1634182049/sample.jpg'
  },
  {
    SKU: '01113',
    nombre: 'Prueba 2',
    precio: "199",
    estado: 'habilitado',
    imagen:'https://res.cloudinary.com/dzsitpxzw/image/upload/v1634182049/sample.jpg'
  }
]

const apiUrl = 'http://localhost:5000/api';


const ListProduct = () => {
  const history = useHistory()
  const [product, setProduct] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const handleBackTo = () => {
    //home 
  }
   const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    history.push('/')
    setIsError(false)
  }

  useEffect(() =>{
    setIsLoading(true);
    axios.get(`${apiUrl}/productos`).then(
      (response) => {
        console.log('respose in useEffect: ',response);
        setProduct(response.data.products)
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        setIsError(true)
      }
      );
    },[])
    
  return (
  <>
    <MaxtBackdrop isOpen={isLoading}/>
    {
      !isLoading && !isError && (
          <div className="m-sm-30">
            <div className="mb-sm-30">
              <Breadcrumb
                routeSegments={[
                  { name: 'Listar productos' },
                ]}
              />
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
                          <TableCell className="pr-0" align="right" colSpan={1}>
                            Precio de venta (s/.)
                          </TableCell>
                          <TableCell className="pr-5" align="right" colSpan={1}>
                            Estado
                          </TableCell>
                          <TableCell className="pr-5" align="right" colSpan={1}>
                            Acciones
                          </TableCell>
                          <TableCell className="pr-5" align="right" colSpan={1}>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {product
                        && product
                          .map((subscriber, index) => (
                            <TableRow key={index}>
                              <TableCell
                                colSpan={1}
                                className="px-0 capitalize"
                                align="left"
                                >
                                {subscriber.SKU}
                              </TableCell>
                              <TableCell colSpan={4} className="px-0 capitalize" align="left">
                                <div className="flex items-center">
                                  {<Avatar src={subscriber.imagenes[0]} />}
                                  <p className="m-0 ml-4">{subscriber.nombre}</p>
                                </div>
                              </TableCell>
                              <TableCell
                                  colSpan={1}
                                  className="pr-5"
                                  align="right"
                              >
                                {subscriber.precio}
                              </TableCell>
                              <TableCell
                                  colSpan={1}
                                  className="px-1"
                                  align="right"
                              >
                                {subscriber.estado}
                              </TableCell>
                              <TableCell
                                colSpan={2}
                                className="px-5"
                              >
                                <Tooltip title="Visualizar">
                                    <IconButton
                                      size="large"
                                    >
                                      <Icon color="primary">visibility</Icon>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Editar">
                                  <IconButton
                                    size="large"
                                  >
                                    <Icon color="primary">edit</Icon>
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Anuladar">
                                  <IconButton
                                    size="large"
                                  >
                                    <Icon color="primary">do_not_disturb_alt</Icon>
                                  </IconButton>
                                </Tooltip>
                                  
                              </TableCell>
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
                        <span className="capitalize">Volver atras</span>
                      </Button>
                    </Grid>
                  </Grid>
            </SimpleCard>
          </div>
      )
    }
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

export default ListProduct
