import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Slide,
} from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const ConfirmationDialog = ({
  open,
  onConfirmDialogClose,
  text,
  title = 'confirm',
  onYesClick,
}) => {
  return (
    <Dialog
      TransitionComponent={Transition}
      maxWidth="xs"
      fullWidth
      open={open}
      onClose={onConfirmDialogClose}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>{text}</DialogContent>
      <DialogActions>
        <Button variant="text" color="primary" onClick={onConfirmDialogClose}>
          Cancelar
        </Button>
        <Button variant="text" color="error" onClick={onYesClick}>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
