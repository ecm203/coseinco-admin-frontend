import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
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
} from '@material-ui/core'
import { MaxtBackdrop } from 'app/components'
import axios from 'axios'

const apiUrl = 'http://localhost:5000/api-admin'
const productList = [
  {
    product: 'Abcdefghijklmnñ',
    sku: '6787AD8',
    quantity: 645,
    serie: 'FDA4654WEFW',
  },
  {
    product: 'Abcdefghijklmnñ',
    sku: '6787AD8',
    quantity: 645,
    serie: 'FDA4654WEFW',
  },
  {
    product: 'Abcdefghijklmnñ',
    sku: '6787AD8',
    quantity: 645,
    serie: 'FDA4654WEFW',
  },
  {
    product: 'Abcdefghijklmnñ',
    sku: '6787AD8',
    quantity: 645,
    serie: 'FDA4654WEFW',
  },
  {
    product: 'Abcdefghijklmnñ',
    sku: '6787AD8',
    quantity: 645,
    serie: 'FDA4654WEFW',
  },
]
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const ReferralGuide = ({ open, handleClose, orderCode }) => {
  const [isLoading, setisLoading] = useState(true)
  const [order, setOrder] = useState(null)

  useEffect(() => {
    orderCode &&
      axios
        .post(`${apiUrl}/guia/getGuiaInfo`, {
          codigo: orderCode,
        })
        .then((response) => {
          console.log(response)
          setOrder(response.data)
          setisLoading(false)
        })
  }, [orderCode])

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`Pedido Nro. ${order?.codigo}`}
        </DialogTitle>
        <DialogContent>
          <MaxtBackdrop className="h-150" isOpen={isLoading} />
          {!isLoading && (
            <Table className="whitespace-pre">
              <TableHead>
                <TableRow>
                  <TableCell className="px-0">SKU</TableCell>
                  <TableCell className="px-0">Nombre</TableCell>
                  <TableCell className="px-0" align="center">Cantidad</TableCell>
                  <TableCell className="px-0">Nro. Serie</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order &&
                  order.productores.map((subscriber, index) => (
                    <TableRow key={index}>
                      <TableCell className="px-0 capitalize" align="left">
                      {subscriber.sku}
                      </TableCell>
                      <TableCell className="px-0 capitalize" align="left">
                        {subscriber.nombre}
                      </TableCell>
                      <TableCell className="px-0 capitalize" align="center">
                        {subscriber.cantidad}
                      </TableCell>
                      <TableCell className="px-0 capitalize" align="left">
                        {subscriber.nseries.map((el, index) => (
                          <Chip key={index} className="m-1" label={el} />
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Generar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ReferralGuide
