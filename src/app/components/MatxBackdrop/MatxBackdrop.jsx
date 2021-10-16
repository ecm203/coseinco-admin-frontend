import React from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    position: 'absolute',
    backgroundColor: '#fff',
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
