import React, { useEffect, useState } from 'react'
import { Breadcrumb, SimpleCard, MaxtBackdrop } from 'app/components'
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router'
import './image-upload.css'
const apiUrl = 'http://localhost:5000/api'
const AddProduct = () => {
  const history = useHistory()
  const [marcas, setMarcas] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState(null)
  const [post, setPost] = useState({
    photos: [],
  })
  const [highlight, setHighlight] = useState(false)
  const { photos } = post
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValue: {
      sku: '',
      name: '',
      marca: null,
      salePrice: '',
      purchasePrice: '',
      feature: '',
      manufacturer: '',
    },
  })
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const isEditable = searchParams.get('isEditable')
  const productCode = searchParams.get('codigo')

  useEffect(() => {
    setIsLoading(true)
    if (productCode !== null && isEditable !== null && marcas !== null) {
      axios
        .get(`${apiUrl}/productos/getById/${productCode}`, {
          id: productCode,
        })
        .then(
          (response) => {
            console.log('response in pd:', response)
            setProduct(response.data.producto)
            const brandName = marcas.find(
              (marca) => marca._id === response.data.producto.marcaID
            )
            reset({
              sku: response.data.producto.SKU,
              name: response.data.producto.nombre,
              marca: brandName,
              salePrice: response.data.producto.precioCompra,
              purchasePrice: response.data.producto.precio,
              feature: response.data.producto.caracteristica,
              manufacturer: response.data.producto.codigoFabricante,
            })
            setIsLoading(false)
          },
          (error) => {
            setIsLoading(false)
          }
        )
    } else {
      setIsLoading(false)
    }
  }, [productCode, isEditable, marcas, reset])

  useEffect(() => {
    axios.get(`${apiUrl}/marcas`).then((response) => {
      setMarcas(response.data.marcas)
    })
  }, [])

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

  const handleSubmitForm = (data) => {
    let imagesUrl = []
    setIsLoading(true)
    if (photos.length > 0) {
      photos.map(
        async (photo, index) =>
          await axios
            .post(`${apiUrl}/productos/productoImagen`, {
              file: photo.src,
              sku: data.sku,
            })
            .then((response) => {
              imagesUrl.push(response.data.url)
              if (index === photos.length - 1) {
                console.log(imagesUrl)
                const productData = {
                  sku: data.sku,
                  name: data.name,
                  brand: data.marca._id,
                  salePrice: parseFloat(data.salePrice),
                  purchasePrice: parseFloat(data.purchasePrice),
                  feature: data.feature,
                  manufacturer: data.manufacturer,
                  images: imagesUrl,
                }
                console.log(productData)
                axios
                  .post(`${apiUrl}/productos/productoCreate`, {
                    product: productData,
                  })
                  .then((response) => {
                    history.push('/producto/listar')
                  })
              }
            })
      )
    }
  }

  return (
    <>
      {isLoading ? (
        <MaxtBackdrop isOpen={isLoading} />
      ) : (
        marcas && (
          <div className="m-sm-30">
            <div className="mb-sm-30">
              <Breadcrumb
                routeSegments={[
                  {
                    name:
                      productCode !== null
                        ? isEditable === 'true' ?  'Editar producto' : 'Ver Producto'
                        : 'Agregar producto',
                  },
                ]}
              />
            </div>
            <SimpleCard
              title={
                productCode !== null
                  ? `Producto: ${product?.SKU}`
                  : 'Agregar producto'
              }
            >
              <form onSubmit={handleSubmit(handleSubmitForm)}>
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
                          disabled={isEditable === 'false'}
                        />
                      )}
                      defaultValue={''}
                      name="sku"
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
                          disabled={isEditable === 'false'}
                        />
                      )}
                      defaultValue=""
                      name="name"
                      control={control}
                      rules={{
                        required: 'Campo requerido',
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          options={marcas === null ? [] : marcas}
                          fullWidth
                          isOptionEqualToValue={(option) => option._id}
                          getOptionLabel={(option) => option.nombre}
                          onChange={(_, data) => field.onChange(data)}
                          disabled={isEditable === 'false'}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Marca"
                              variant="outlined"
                              size="small"
                              error={!!errors.marca}
                              helperText={errors.marca?.message}
                            />
                          )}
                        />
                      )}
                      name="marca"
                      defaultValue={null}
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
                          error={!!errors.manufacturer}
                          fullWidth
                          size="small"
                          variant="outlined"
                          label="Código de fabricante"
                          helperText={errors.manufacturer?.message}
                          disabled={isEditable === 'false'}
                        />
                      )}
                      defaultValue=""
                      name="manufacturer"
                      control={control}
                      rules={{
                        required: 'Campo requerido',
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Controller
                      name="salePrice"
                      defaultValue=""
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
                          error={!!errors.salePrice}
                          fullWidth
                          type="number"
                          size="small"
                          variant="outlined"
                          label="Precio de Venta"
                          helperText={errors.salePrice?.message}
                          disabled={isEditable === 'false'}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Controller
                      name="purchasePrice"
                      defaultValue=""
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
                          error={!!errors.purchasePrice}
                          fullWidth
                          type="number"
                          size="small"
                          variant="outlined"
                          label="Precio de Compra"
                          helperText={errors.purchasePrice?.message}
                          disabled={isEditable === 'false'}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          error={!!errors.feature}
                          fullWidth
                          multiline
                          rows={4}
                          size="small"
                          variant="outlined"
                          label="Caracterticas"
                          helperText={errors.feature?.message}
                          disabled={isEditable === 'false'}
                        />
                      )}
                      defaultValue=""
                      name="feature"
                      control={control}
                      rules={{
                        required: 'Campo requerido',
                      }}
                    />
                  </Grid>
                  {isEditable !== null && isEditable === 'false' ? (
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: '500' }}
                      >
                        Imagenes
                      </Typography>
                      <ImageList cols={6}>
                        {product !== null &&
                          product.imagenes.map((item, index) => (
                            <ImageListItem key={index} sx={{ px: 1 }}>
                              <img
                                alt={index}
                                src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                loading="lazy"
                              />
                            </ImageListItem>
                          ))}
                      </ImageList>
                    </Grid>
                  ) : (
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
                          <label htmlFor="filephotos">Inserte imagenes</label>
                        </div>
                        <div
                          className={
                            photos.length > 0
                              ? 'custom-file-preview files'
                              : 'custom-file-preview'
                          }
                        >
                          {photos.length > 0 &&
                            photos.map((item, index) => (
                              <div
                                className="prev-img"
                                key={index}
                                data-imgindex={index}
                              >
                                <span onClick={handleDelete}>&times;</span>
                                <img src={item.src} alt={item.name} />
                              </div>
                            ))}
                        </div>
                      </div>
                    </Grid>
                  )}
                  {productCode === null && isEditable === null && (
                    <Grid
                      item
                      lg={6}
                      md={6}
                      sm={12}
                      xs={12}
                      sx={{ ml: 'auto' }}
                    >
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
                  )}
                  {productCode !== null && (
                    <Grid
                      item
                      lg={6}
                      md={6}
                      sm={12}
                      xs={12}
                      sx={{ ml: 'auto' }}
                    >
                      <Button
                        className="w-full"
                        sx={{ height: '37px' }}
                        color="secondary"
                        variant="outlined"
                        type="submit"
                        onClick={() => history.push('/producto/listar')}
                      >
                        Volver
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </form>
            </SimpleCard>
          </div>
        )
      )}
    </>
  )
}

export default AddProduct
