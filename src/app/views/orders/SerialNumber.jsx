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
  const [serialNumbers, setSerialNumbers] = useState()
  const [value, setValue] = useState([])

  useEffect(() => {
    if (product) {
      axios
        .get(`${apiUrl}/inventario/getSeriesByProductId/${product.productoID}`)
        .then((response) => {
          const data = response.data.nSeries.map((el) => ({
            label: el,
          }))
          setSerialNumbers(data);
          setValue([...Array(product.cantidad)].map((e) => ''))
        })
    }
  }, [product])

  const handleInputChange = (event, newValue, index) => {
    console.log(index, newValue, value)
    if (newValue) {
      value[index] = newValue.label
      const listSerialNumber = serialNumbers.filter((el) => el !== newValue);
      console.log(listSerialNumber);
      setSerialNumbers(listSerialNumber);
    } else {
      value[index] = ''
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('hola mundo')
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
            {serialNumbers &&
              [...Array(product?.cantidad)].map((i, index) => (
                <Autocomplete
                  key={index}
                  className='mb-5'
                  value={value[i]}
                  options={serialNumbers}
                  getOptionLabel={(option) => option.label}
                  fullWidth
                  onChange={(event, newValue) => {
                    handleInputChange(event, newValue, index)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Número de serie"
                      variant="outlined"
                    />
                  )}
                />
              ))}
          </DialogContent>
          <DialogActions>
            <Button color="secondary" variant="outlined" type="submit">
              Cancelar
            </Button>
            <Button color="primary" variant="outlined" type="submit">
              Guardar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default SerialNumber
