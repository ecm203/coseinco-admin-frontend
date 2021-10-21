import React from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Button, Grid, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

const AddProduct = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const handleSubmitForm = (data) => {}

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb routeSegments={[{ name: 'Agregar producto' }]} />
      </div>
      <SimpleCard title="Agregar producto">
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
                  />
                )}
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
                  />
                )}
                name="name"
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
                    label="Cantidad"
                    helperText={errors.quantity?.message}
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
                  />
                )}
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
  )
}

export default AddProduct
