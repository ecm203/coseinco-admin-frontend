import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Slide from '@mui/material/Slide'
import { Grid, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const ModifySupplier = ({
  supplierM,
  isOpen,
  loadTable,
  onToggle,
  edit = true,
}) => {
  const { razonSocial, ruc, correo, contacto, telefono, descuento, _id } =
    supplierM

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      razonSocial: '',
      ruc: '',
      correo: '',
      contacto: '',
      telefono: '',
      descuento: '',
    },
  })

  const handleSubmitForm = async (field) => {
    const proveedor = {
      razonSocial: field.razonSocial,
      ruc: field.ruc,
      correo: field.correo,
      contacto: field.contacto,
      telefono: field.telefono,
      descuento: field.descuento,
    }

    await axios
      .post('http://localhost:5000/api-admin/proveedor/modify', {
        _id,
        proveedor,
      })
      .then(
        (response) => {
          onToggle()
          loadTable()
        },
        (error) => {
          // setIsLoading(false)
        }
      )
  }

  useEffect(() => {
    if (isOpen) {
      reset({
        razonSocial: razonSocial,
        ruc: ruc,
        correo: correo,
        contacto: contacto,
        telefono: telefono,
        descuento: descuento,
      })
    } else {
    }
  }, [isOpen, reset, razonSocial, ruc, correo, contacto, telefono, descuento])

  return (
    <div>
      <Dialog
        onClose={onToggle}
        TransitionComponent={Transition}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <DialogTitle id="customized-dialog-title" onClose={onToggle}>
          Modificar proveedor
        </DialogTitle>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <DialogContent>
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
                      disabled={!edit}
                      helperText={errors.razonSocial?.message}
                    />
                  )}
                  defaultValue={''}
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
                      disabled={!edit}
                      helperText={errors.ruc?.message}
                    />
                  )}
                  defaultValue={''}
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
                      disabled={!edit}
                      helperText={errors.correo?.message}
                    />
                  )}
                  defaultValue={''}
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
                      disabled={!edit}
                      helperText={errors.contacto?.message}
                    />
                  )}
                  defaultValue={''}
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
                      disabled={!edit}
                      helperText={errors.telefono?.message}
                    />
                  )}
                  defaultValue={''}
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
                  defaultValue={''}
                  rules={{
                    required: 'Campo requerido',
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.descuento}
                      fullWidth
                      type="number"
                      size="small"
                      disabled={!edit}
                      variant="outlined"
                      label="Descuento %"
                      helperText={errors.descuento?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={onToggle}>
              Cerrar
            </Button>
            {edit && <Button type="submit">Guardar</Button>}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default ModifySupplier
