import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0,.01)',
    zIndex: theme.zIndex.drawer + 1,
  },
}))

const MatxBackdrop = ({isOpen}) => {
  const classes = useStyles()

  return (
    <Backdrop className={classes.backdrop} open={isOpen}>
      <CircularProgress color="primary" />
    </Backdrop>
  )
}

export default MatxBackdrop
