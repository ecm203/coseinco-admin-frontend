import React from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Button, Grid, InputAdornment, TextField } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import { useForm, Controller } from 'react-hook-form'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

const AddPurchaseOrder = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb routeSegments={[{ name: 'Agregar OC' }]} />
      </div>
      <SimpleCard title={'Agregar producto'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Controller
                name="product"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Campo requerido',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-5"
                    error={!!errors.product}
                    fullWidth
                    size="small"
                    variant="outlined"
                    id="standard-error"
                    label="Producto"
                    helperText={errors.product?.message}
                  />
                )}
              />
              <Controller
                name="cost"
                control={control}
                defaultValue=""
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
                    className="mb-5"
                    error={!!errors.cost}
                    fullWidth
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    size="small"
                    variant="outlined"
                    id="standard-error"
                    label="Costo"
                    helperText={errors.cost?.message}
                  />
                )}
              />
              <Controller
                name="disccount"
                control={control}
                defaultValue={0}
                rules={{
                  required: 'Campo requerido',
                  min: {
                    value: 0,
                    message: 'Descuento min. 0%',
                  },
                  max: {
                    value: 100,
                    message: 'Descuento máx. 100%',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors.disccount}
                    fullWidth
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">%</InputAdornment>
                      ),
                    }}
                    size="small"
                    variant="outlined"
                    id="standard-error"
                    label="Descuento"
                    helperText={errors.disccount?.message}
                  />
                )}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Controller
                name="supplier"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Campo requerido',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-5"
                    error={!!errors.supplier}
                    fullWidth
                    size="small"
                    variant="outlined"
                    id="standard-error"
                    label="Proveedor"
                    helperText={errors.supplier?.message}
                  />
                )}
              />
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
                    className="mb-5"
                    error={!!errors.quantity}
                    fullWidth
                    type="number"
                    size="small"
                    variant="outlined"
                    id="standard-error"
                    label="Cantidad"
                    helperText={errors.quantity?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="date"
                rules={{
                  required: 'Campo requerido',
                }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      // disableToolbar
                      // disablePast
                      fullWidth
                      error={!!errors.date}
                      helperText={errors.date?.message}
                      variant="dialog"
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      size="small"
                      label="Fecha de llegada"
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      value={value}
                      onChange={onChange}
                    />
                  </MuiPickersUtilsProvider>
                )}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Button
                className="w-full"
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

export default AddPurchaseOrder
