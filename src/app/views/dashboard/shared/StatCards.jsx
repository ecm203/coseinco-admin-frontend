import React from 'react'
import { Grid, Card, Icon, IconButton, Tooltip } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles(({ palette, ...theme }) => ({
  icon: {
    fontSize: '44px',
    opacity: 0.6,
    color: palette.primary.main,
  },
}))

const StatCards = ({ data }) => {
  const classes = useStyles()

  return (
    <Grid container spacing={3} className="mb-3">
      <Grid item xs={12} md={6}>
        <Card
          className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
          elevation={6}
        >
          <div className="flex items-center">
            <Icon className={classes.icon}>group</Icon>
            <div className="ml-3">
              <small className="text-muted">Nuevos clientes</small>
              <h6 className="m-0 mt-1 text-primary font-medium">
                {data?.clientes}
              </h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton size="large">
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card
          className="flex flex-wrap justify-between align-center p-sm-24 bg-paper"
          elevation={6}
        >
          <div className="flex items-center">
            <Icon className={classes.icon}>attach_money</Icon>
            <div className="ml-3">
              <small className="text-muted line-height-1">Ventas del dia</small>
              <h6 className="m-0 mt-1 text-primary font-medium">
                {'$ ' + data?.ventasDelDia}
              </h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton size="large">
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card
          className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
          elevation={6}
        >
          <div className="flex items-center">
            <Icon className={classes.icon}>inventory</Icon>
            <div className="ml-3">
              <small className="text-muted">Ordenes por llegar</small>
              <h6 className="m-0 mt-1 text-primary font-medium">
                {data?.ordenes + ' órdenes'}
              </h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton size="large">
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card
          className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
          elevation={6}
        >
          <div className="flex items-center">
            <Icon className={classes.icon}>shopping_cart</Icon>
            <div className="ml-3">
              <small className="text-muted">Pedidos por enviar</small>
              <h6 className="m-0 mt-1 text-primary font-medium">
                {data?.pedidosPorEnviar + ' pedidos'}
              </h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton size="large">
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
    </Grid>
  )
}

export default StatCards
