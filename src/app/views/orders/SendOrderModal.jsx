import React, { useState, useEffect } from 'react'
import {
  Dialog,
  Slide,
  Grid,
  TextField,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Autocomplete,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})
const apiUrl = 'http://localhost:5000/api'

const SendOrderModal = ({ open, handleClose, order, handleAction }) => {
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValue: {
      driver: null,
    },
  })
  const [idCard, setIdCard] = useState('')
  const [drivers, setDrivers] = useState(null)

  const sendData = (data, e) => {
    handleClose()
    handleAction(order, data)
  }

  useEffect(() => {
    if (open === false) {
      setIdCard('') 
      setDrivers(null)
      reset({
        driver: null,
      })
    }
  }, [open, reset])

  useEffect(() => {
    if (open) {
      axios.get(`${apiUrl}/usuario/getConductores`).then((response) => {
        setDrivers(response.data.conductores)
      })
    }
  }, [open])

  const handleChangeDriver = (data) => {
    if (data) {
      setIdCard(data.numeroDocumento)
    } else {
      setIdCard('')
    }
  }

  return (
    <>
      {drivers && (
        <Dialog
          open={open}
          fullWidth
          maxWidth="sm"
          TransitionComponent={Transition}
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {order?.codigo}
          </DialogTitle>
          <form onSubmit={handleSubmit(sendData)}>
            <DialogContent sx={{ overflowY: 'initial' }}>
              <Grid container spacing={3}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                    label="Cliente"
                    value={order?.cliente.name + ' ' + order?.cliente.lastName}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                    label="Distrito"
                    value={order?.cliente.distrito}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                    label="Dirección"
                    value={order?.cliente.address}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        id="controlled-demo"
                        options={drivers}
                        fullWidth
                        getOptionLabel={(option) => option.nombres}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Conductor"
                            variant="outlined"
                            size="small"
                            error={!!errors.driver}
                            helperText={errors.driver?.message}
                          />
                        )}
                        onChange={(_, data) => {
                          handleChangeDriver(data)
                          return field.onChange(data)
                        }}
                      />
                    )}
                    defaultValue={null}
                    name="driver"
                    control={control}
                    rules={{
                      required: 'Campo requerido',
                    }}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                    label="DNI"
                    onChange={handleChangeDriver}
                    value={idCard}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                variant="text"
                type="button"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button color="primary" variant="text" type="submit">
                Enviar
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </>
  )
}

export default SendOrderModal
