import React from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Button, Grid, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const AddSupplier = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    formState
  } = useForm()

  const history = useHistory()
  const handleSubmitForm = (field) => {
    const body = {
      proveedor: {
        razonSocial: field.razonSocial,
        ruc: field.ruc,
        correo: field.correo,
        contacto: field.contacto,
        telefono: field.telefono,
        descuento: field.descuento,
        estado: "habilitado"
      },
    }

    axios.post('http://localhost:5000/api-admin/proveedor/create', body).then(
      (response) => {
        history.push('/proveedor/listar')
      },
      (error) => {
        // setIsLoading(false)
      }
    )
  }

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb routeSegments={[{ name: 'Agregar proveedor' }]} />
      </div>
      <SimpleCard title="Agregar proveedor">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Grid container spacing={3}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors.razonSocial}
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Razon social"
                    helperText={errors.razonSocial?.message}
                  />
                )}
                name="razonSocial"
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
                    error={!!errors.ruc}
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="RUC"
                    helperText={errors.ruc?.message}
                  />
                )}
                name="ruc"
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
                    error={!!errors.correo}
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Correo"
                    helperText={errors.correo?.message}
                  />
                )}
                name="correo"
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
                    error={!!errors.contacto}
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Contacto"
                    helperText={errors.contacto?.message}
                  />
                )}
                name="contacto"
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
                    error={!!errors.telefono}
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Telefono"
                    helperText={errors.telefono?.message}
                  />
                )}
                name="telefono"
                control={control}
                rules={{
                  required: 'Campo requerido',
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Controller
                name="descuento"
                control={control}
                defaultValue={0}
                rules={{
                  required: 'Campo requerido',
                  min: {
                    value: 0,
                    message: 'Descuento min. 0',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors.descuento}
                    fullWidth
                    type="number"
                    size="small"
                    variant="outlined"
                    label="Descuento %"
                    helperText={errors.descuento?.message}
                  />
                )}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}></Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Button
                className="w-full"
                size="medium"
                color="primary"
                variant="contained"
                type="submit"
              >
                Agregar
              </Button>
            </Grid>
          </Grid>
        </form>
      </SimpleCard>
    </div>
  )
}

export default AddSupplier
