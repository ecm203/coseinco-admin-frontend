import React, { useEffect, useState } from 'react'
import {
  Breadcrumb,
  SimpleCard,
  MaxtBackdrop,
  MatxSnackbar,
  ConfirmationDialog,
} from 'app/components'
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
} from '@mui/material'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


const apiUrl = 'http://localhost:5000/api'

const ListProduct = () => {
  const history = useHistory()
  const [product, setProduct] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const handleBackTo = () => {
    //home
  }
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenModalHabilitar, setIsOpenModalHabilitar] = useState(false)
  const [ productsSelected, setProductsSelected] = useState(null)
  const [ productSelected, setProductSelected] = useState(null)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    history.push('/')
    setIsError(false)
  }

  const handleProductDetailOpen = (id) =>{
    history.push(`/producto/?codigo=${id}&isEditable=false`);
  }

  const handleProductEditOpen = (id) =>{
    history.push(`/producto/?codigo=${id}&isEditable=true`)
  }

  const handleOpenModal = (SKU,producSelected) => {
    setIsOpenModal(true)
    setProductsSelected(SKU)
    setProductSelected(producSelected)
  }

   const handleOpenModalHabilitar = (SKU,producSelected) => {
    setIsOpenModalHabilitar(true)
    setProductsSelected(SKU)
    setProductSelected(producSelected)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

   const handleCloseModalEnable = () => {
    setIsOpenModalHabilitar(false)
  }


  const handleDisableProduct = () => {
    setIsLoading(true)
    axios
      .post(`${apiUrl}/productos/anular`, {
        id: productsSelected,
      })
      .then(
        (response) => {
          setIsOpenModal(false)
          loadTableData()
        },
        (error) => {
          setIsOpenModal(false)
        }
      )
  }

  const handleEnableProduct = () => {
    setIsLoading(true)
    axios
      .post(`${apiUrl}/productos/habilitar`, {
        id: productsSelected,
      })
      .then(
        (response) => {
          setIsOpenModalHabilitar(false)
          loadTableData()
        },
        (error) => {
          setIsOpenModalHabilitar(false)
        }
      )
  }

  const loadTableData = () => {
    setProduct(null)
    setIsLoading(true)
    axios.get(`${apiUrl}/productos`).then(
      (response) => {
        setProduct(response.data.products)
        setIsLoading(false)
      },
      (error) => {
        setIsLoading(false)
        setIsError(true)
      }
    )
  }
  
  useEffect(() => {
    setIsLoading(true)
    axios.get(`${apiUrl}/productos`).then(
      (response) => {
        setProduct(response.data.products)
        setIsLoading(false)
      },
      (error) => {
        setIsLoading(false)
        setIsError(true)
      }
    )
  }, [])

  return (
    <>
      <MaxtBackdrop isOpen={isLoading} />
      {!isLoading && !isError && (
        <>
          <div className="m-sm-30">
            <div className="mb-sm-30">
              <Breadcrumb routeSegments={[{ name: 'Listar productos' }]} />
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
                        Precio/V
                      </TableCell>
                      <TableCell className="pl-5" align="left" colSpan={1}>
                        Estado
                      </TableCell>
                      <TableCell className="px-5" align="left" colSpan={2}>
                        Acciones
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {product.map((subscriber, index) => (
                      <TableRow key={index}>
                        <TableCell
                          colSpan={1}
                          className="px-0 capitalize"
                          align="left"
                        >
                          {subscriber.SKU}
                        </TableCell>
                        <TableCell
                          colSpan={4}
                          className="px-0 capitalize"
                          align="left"
                        >
                          <div className="flex items-center">
                            {<Avatar src={subscriber.imagenes[0]} />}
                            <p className="m-0 ml-4">{subscriber.nombre}</p>
                          </div>
                        </TableCell>
                        <TableCell colSpan={1} className="pr-5" align="right">
                          {'$. ' + subscriber.precio}
                        </TableCell>
                        <TableCell className="pl-5" colSpan={1}>
                          {subscriber.estado}
                        </TableCell>
                        <TableCell colSpan={2} className="px-5">
                          <Tooltip title="Visualizar">
                            <IconButton onClick={()=>{handleProductDetailOpen(subscriber._id)}} size="large" >
                              <Icon color="primary">visibility</Icon>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Editar">
                            <IconButton size="large" onClick={()=>{handleProductEditOpen(subscriber._id)}}>
                              <Icon color="primary">edit</Icon>
                            </IconButton>
                          </Tooltip>
                          {
                            subscriber.estado === 'habilitado' && (
                              <>
                                <Tooltip title="Inhabilitar">
                                  <IconButton size="large" onClick={()=> handleOpenModal(subscriber.SKU,subscriber.nombre)}>
                                    <Icon color="primary">do_not_disturb_alt</Icon>
                                  </IconButton>
                                </Tooltip>
                              </>
                            )
                          }
                          {
                            subscriber.estado === 'inhabilitado' && (
                              <>
                                <Tooltip title="Habilitar">
                                  <IconButton size="large" onClick={()=> handleOpenModalHabilitar(subscriber.SKU,subscriber.nombre)}>
                                    <Icon color="primary">check</Icon>
                                  </IconButton>
                                </Tooltip>
                              </>
                            )
                          }

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
                    Volver
                  </Button>
                </Grid>
              </Grid>
            </SimpleCard>
          </div>
          <ConfirmationDialog
              open={isOpenModal}
              onConfirmDialogClose={handleCloseModal}
              onYesClick={handleDisableProduct}
              title={'Inhabilitar producto'}
              text={`Esta seguro que desea inhabilitar el producto ${productSelected}`}
          />
          <ConfirmationDialog
              open={isOpenModalHabilitar}
              onConfirmDialogClose={handleCloseModalEnable}
              onYesClick={handleEnableProduct}
              title={'Habilitar producto'}
              text={`Esta seguro que desea habilitar el producto ${productSelected}`}
          />
        </>
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

export default ListProduct
