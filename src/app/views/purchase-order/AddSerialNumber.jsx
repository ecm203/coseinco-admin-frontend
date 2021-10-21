import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Dialog,
  Slide,
  TextField,
  DialogActions,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material'
import axios from 'axios'
import EmptyData from 'app/components/icons/EmptyData'
import { parseNumber } from 'globalize'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})
const apiUrl = 'http://localhost:5000/api-admin'

const AddSerialNumber = ({ open, handleClose, product, handleSaveSn }) => {
  const [serialNumbers, setSerialNumbers] = useState(null)
  const [values, setValues] = useState([])
  const [value, setValue] = useState('')
  const [errorValue, setErrorValue] = useState(null)

  useEffect(() => {
    if (open === false) {
      setValues([])
      setValue('')
      setSerialNumbers(null)
      setErrorValue(null)
    }
  }, [open])

  useEffect(() => {
    if (product && open) {
      axios
        .get(`${apiUrl}/inventario/getSeriesByProductId/${product.productoId}`)
        .then((response) => {
          setSerialNumbers(response.data.nSeries)
          console.log(response.data.nSeries)
        })
    }
  }, [product, open])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!!errorValue !== true) {
      setValues([...values, value])
      setValue('')
    }
  }

  const handleChange = (e) => {
    setErrorValue(null)
    const indexSN = serialNumbers.findIndex((sn) => sn === e.target.value)
    setValue(e.target.value)
    if (indexSN >= 0) {
      setErrorValue('Número de serie registrado')
    } else if (values.length === parseInt(product.cantidad)) {
      setErrorValue(`Debe registrar ${product.cantidad} números de serie`)
    }
  }

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xs"
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{product?.nombre}</DialogTitle>
      <div>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              value={value}
              onChange={handleChange}
              type="text"
              size="small"
              className="mb-4"
              fullWidth
              abel="Nro. Serie"
              variant="outlined"
              error={!!errorValue}
              helperText={errorValue}
            />
          </form>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={1}>N°</TableCell>
                <TableCell colSpan={3}>Series</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values.length > 0 ? (
                values.map((val, index) => (
                  <TableRow>
                    <TableCell colSpan={1}>{index + 1}</TableCell>
                    <TableCell colSpan={3}>{val}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell sx={{ p: 0, border: 'none' }} colSpan={4}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        pt: 3,
                        px: 3,
                      }}
                    >
                      <EmptyData
                        color="action"
                        sx={{ width: '64px', height: 'auto', mb: 2 }}
                      />
                      <Typography color="GrayText" variant="subtitle1">
                        No hay información para mostrar
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DialogContent>
      </div>
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
    </Dialog>
  )
}

export default AddSerialNumber
