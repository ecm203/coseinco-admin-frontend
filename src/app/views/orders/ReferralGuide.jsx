import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Chip,
} from '@mui/material'
import { MaxtBackdrop } from 'app/components'
import makeStyles from '@mui/styles/makeStyles';
import axios from 'axios'

const apiUrl = 'http://localhost:5000/api-admin'

const useStyles = makeStyles({
  dialog: {
    '& .MuiDialog-paper': {
      minHeight: '200px',
    },
  },
})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const ReferralGuide = ({ open, handleClose, orderCode }) => {
  const classes = useStyles()
  const [isLoading, setisLoading] = useState(true)
  const [order, setOrder] = useState(null)

  useEffect(() => {
    open === false && setisLoading(true)
    setOrder(null)
  }, [open])

  useEffect(() => {
    orderCode &&
      open &&
      axios
        .post(`${apiUrl}/guia/getGuiaInfo`, {
          codigo: orderCode,
        })
        .then((response) => {
          setOrder(response.data)
          setisLoading(false)
        })
  }, [orderCode, open])

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullWidth
        className={classes.dialog}
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <MaxtBackdrop isOpen={isLoading} />
        {!isLoading && (
          <>
            <DialogTitle id="alert-dialog-slide-title">
              {`Pedido Nro. ${order?.codigo}`}
            </DialogTitle>
            <DialogContent>
              <Table className="whitespace-pre">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={1} className="px-0">
                      SKU
                    </TableCell>
                    <TableCell colSpan={4} className="px-0">
                      Nombre
                    </TableCell>
                    <TableCell colSpan={2} className="pr-3" align="right">
                      Cantidad
                    </TableCell>
                    <TableCell colSpan={2} className="px-0">
                      Nro. Serie
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order &&
                    order.productores.map((subscriber, index) => (
                      <TableRow key={index}>
                        <TableCell
                          colSpan={1}
                          className="px-0 capitalize"
                          align="left"
                        >
                          {subscriber.sku}
                        </TableCell>
                        <TableCell
                          colSpan={4}
                          className="px-0 capitalize"
                          align="left"
                        >
                          {subscriber.nombre}
                        </TableCell>
                        <TableCell colSpan={2} className="pr-3" align="right">
                          {subscriber.cantidad}
                        </TableCell>
                        <TableCell
                          colSpan={2}
                          className="px-0 capitalize"
                          align="left"
                        >
                          {subscriber.nseries.map((el, index) => (
                            <Chip key={index} className="m-1" label={el} />
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancelar
              </Button>
              <Button onClick={handleClose} color="primary">
                Generar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  )
}

export default ReferralGuide
