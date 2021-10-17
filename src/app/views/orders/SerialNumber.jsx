import React, { useEffect, useState } from 'react'
import {
  Dialog,
  Slide,
  TextField,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@mui/material'
import Button from '@mui/material/Button'
import { Autocomplete } from '@mui/material';
import axios from 'axios'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})
const apiUrl = 'http://localhost:5000/api-admin'

const SerialNumber = ({ open, handleClose, product, handleSaveSn }) => {
  const [serialNumbers, setSerialNumbers] = useState(null)
  const [value, setValue] = useState([])
  const [errorInput, setErrorInput] = useState(null)

  useEffect(() => {
    if (open === false) {
      setValue([])
      setErrorInput(null)
    }
  }, [open])

  useEffect(() => {
    if (product && open) {
      axios
        .get(`${apiUrl}/inventario/getSeriesByProductId/${product.productoID}`)
        .then((response) => {
          setSerialNumbers(response.data.nSeries)
          setValue(product.serialNumbers)
        })
    }
  }, [product, open])

  const handleInputChange = (event, newValue) => {
    setErrorInput(null)
    setValue(newValue)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.length > product.cantidad || value.length < product.cantidad) {
      setErrorInput(`Debe seleccionar ${product.cantidad} números de serie`)
    } else if (value.length === 0) {
      setErrorInput(`Campo requerido`)
    } else {
      handleSaveSn(product.productoID, value)
      handleClose()
    }
  }
  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        maxWidth="xs"
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {product?.nombre}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {serialNumbers && product && (
              <Autocomplete
                multiple
                value={value}
                options={serialNumbers}
                fullWidth
                filterSelectedOptions
                onChange={(event, newValue) => {
                  handleInputChange(event, newValue)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errorInput}
                    helperText={errorInput}
                    label="Número de serie"
                    variant="outlined"
                  />
                )}
              />
            )}
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
              Guardar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default SerialNumber
