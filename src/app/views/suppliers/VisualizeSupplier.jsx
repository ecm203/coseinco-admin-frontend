import React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

const VisualizeSupplier = ({ supplier, isOpen, onToggle }) => {
  const { razonSocial, ruc, correo, contacto, telefono, descuento, estado } =
    supplier

  return (
    <BootstrapDialog
      onClose={onToggle}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onToggle}>
        Proveedor
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="standard-read-only-input"
              label="Razon social"
              defaultValue={razonSocial}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />

            <TextField
              id="standard-read-only-input"
              label="Ruc"
              defaultValue={ruc}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
            <TextField
              id="standard-read-only-input"
              label="Correo"
              defaultValue={correo}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />

            <TextField
              id="standard-read-only-input"
              label="Contacto"
              defaultValue={contacto}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
            <TextField
              id="standard-read-only-input"
              label="Telefono"
              defaultValue={telefono}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
            <TextField
              id="standard-read-only-input"
              label="Descuento"
              defaultValue={descuento}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />

            <TextField
              id="standard-read-only-input"
              label="Estado"
              defaultValue={estado}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onToggle}>
          Cerrar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
}

export default VisualizeSupplier
