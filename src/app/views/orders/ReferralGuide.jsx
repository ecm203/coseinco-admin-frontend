import React from 'react'
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
} from '@material-ui/core'

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

const ReferralGuide = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {'Pedido Nro. 684'}
      </DialogTitle>
      <DialogContent>
        <Table className="whitespace-pre">
          <TableHead>
            <TableRow>
              <TableCell className="px-0">Codigo</TableCell>
              <TableCell className="px-0">Nombre</TableCell>
              <TableCell className="px-0">Cantidad</TableCell>
              <TableCell className="px-0">Nro. Serie</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((subscriber, index) => (
              <TableRow key={index}>
                <TableCell className="px-0 capitalize" align="left">
                  {subscriber.product}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {subscriber.sku}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {subscriber.quantity}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {subscriber.serie}
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
    </Dialog>
  )
}

export default ReferralGuide
