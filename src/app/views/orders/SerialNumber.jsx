import React, { useEffect, useState } from 'react'
import {
  Dialog,
  Slide,
  TextField,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { Autocomplete } from '@material-ui/lab'
import axios from 'axios'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})
const apiUrl = 'http://localhost:5000/api-admin'

const SerialNumber = ({ open, handleClose, product }) => {
  const [serialNumbers, setSerialNumbers] = useState(null)
  const [value, setValue] = useState([])
  const [errorInput, setErrorInput] = useState(null)

  useEffect(() => {
    if (product) {
      axios
        .get(`${apiUrl}/inventario/getSeriesByProductId/${product.productoID}`)
        .then((response) => {
          const data = response.data.nSeries.map((el) => ({
            label: el,
          }))
          setSerialNumbers(data)
        })
    }
  }, [product])

  const handleInputChange = (event, newValue) => {
    setErrorInput(null);
    setValue(newValue);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(value.length > product.cantidad || value.length < product.cantidad) {
      setErrorInput(`Debe seleccionar ${product.cantidad} números de serie`)
    } else if(value.length === 0) {
      setErrorInput(`Campo requerido`)
    } else {
      console.log(value);
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
            {serialNumbers && (
              <Autocomplete
                multiple
                value={value}
                options={serialNumbers}
                getOptionLabel={(option) => option.label}
                fullWidth
                filterSelectedOptions
                onChange={(event, newValue) => {
                  handleInputChange(event, newValue)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error = {!!errorInput}
                    helperText= {errorInput}
                    label="Número de serie"
                    variant="outlined"
                  />
                )}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button color="secondary" variant="text" type="button" onClick={handleClose}>
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
