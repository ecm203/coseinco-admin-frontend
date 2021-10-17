import React from 'react'
import { Snackbar, Alert, AlertTitle } from '@mui/material'

const MatxSnackbar = ({
  open,
  title,
  message,
  horizontal = 'center',
  vertical = 'bottom',
  handleClose,
  duration
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      key={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      autoHideDuration={duration ? duration : null}
    >
      <Alert onClose={handleClose} variant="standard" severity="error" >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default MatxSnackbar
