import React, { Fragment } from 'react'
import { Grid, Card } from '@mui/material'
import DoughnutChart from './shared/Doughnut'
import StatCards from './shared/StatCards'
import TopSellingTable from './shared/TopSellingTable'
import { useTheme } from '@mui/styles'

const data = [
  {
      value: 65,
      name: 'Google',
  },
  {
      value: 20,
      name: 'Most',
  },
  {
      value: 20,
      name: 'Most',
  },
  { value: 15, name: 'Others' },
];

const Analytics = () => {
  const theme = useTheme()

  return (
    <Fragment>
      <div className="analytics m-sm-30 mt-6">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <StatCards />
            <TopSellingTable />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card className="px-6 py-4 mb-6">
              <div className="card-title">Pedidos</div>
              <div className="card-subtitle">Última semana</div>
              <DoughnutChart
                height="300px"
                data={data}
                color={[
                  theme.palette.primary.dark,
                  theme.palette.primary.main,
                  theme.palette.primary.light,
                ]}
              />
            </Card>
            <Card className="px-6 py-4 mb-6">
              <div className="card-title">Ordenes de compra</div>
              <div className="card-subtitle">Última semana</div>
              <DoughnutChart
                height="300px"
                data={data}
                color={[
                  theme.palette.primary.dark,
                  theme.palette.primary.main,
                  theme.palette.primary.light,
                ]}
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  )
}

export default Analytics
