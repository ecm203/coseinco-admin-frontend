import React  from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { Grid, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

const ModifySupplier = ({ supplierM, isOpen, loadTable, onToggle }) => {
  const { razonSocial, ruc, correo, contacto, telefono, descuento, _id } =
    supplierM

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm()

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

  return (
    <div>
      <BootstrapDialog
        onClose={onToggle}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onToggle}>
          Modificar proveedor
        </BootstrapDialogTitle>
        <DialogContent dividers>
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
                  defaultValue={razonSocial}
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
                  defaultValue={ruc}
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
                  defaultValue={correo}
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
                  defaultValue={contacto}
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
                  defaultValue={telefono}
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
                  defaultValue={descuento}
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
                      variant="outlined"
                      label="Descuento %"
                      helperText={errors.descuento?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}></Grid>
            </Grid>
            <DialogActions>
              <Button type="submit">Guardar cambios</Button>
              <Button onClick={onToggle}>Cerrar</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </div>
  )
}

export default ModifySupplier
