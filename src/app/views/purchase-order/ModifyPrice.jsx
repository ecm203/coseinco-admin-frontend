import React, { useEffect } from 'react'
import {
  Button,
  Dialog,
  Slide,
  TextField,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const ModifyPrice = ({ open, close, product, handleSave }) => {
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValue: {
      price: 1,
      quantity: 1,
    },
  })

  const sendData = (data) => {
    handleSave(data)
  }

  useEffect(() => {
    if (open && product) {
      reset({
        price: product.precioCompra,
        quantity: product.cantidad
      })
    } else if (!open && product) {
      reset({
        price: 1,
        quantity: 1,
      })
    }
  }, [open, product, reset])

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xs"
      TransitionComponent={Transition}
      onClose={close}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{product?.nombre}</DialogTitle>
      <form onSubmit={handleSubmit(sendData)}>
        <DialogContent>
          <Controller
            name="price"
            control={control}
            defaultValue={1}
            rules={{
              required: 'Campo requerido',
              min: {
                value: 1,
                message: 'Precio min. 1',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.price}
                sx={{mb:3}}
                fullWidth
                type="number"
                size="small"
                variant="outlined"
                label="Precio de compra"
                helperText={errors.price?.message}
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
              max: {
                value: product?.cantidad,
                message: 'Cantidad max.' + product?.cantidad,
              }
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
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="text"
            type="button"
            onClick={close}
          >
            Cancelar
          </Button>
          <Button color="primary" variant="text" type="submit">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ModifyPrice
