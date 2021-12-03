import React, { Fragment } from 'react'
import { Grid, Card } from '@mui/material'
import DoughnutChart from './shared/Doughnut'
import StatCards from './shared/StatCards'
import TopSellingTable from './shared/TopSellingTable'
import RowCards from './shared/RowCards'
import StatCards2 from './shared/StatCards2'
import Campaigns from './shared/Campaigns'
import { useTheme } from '@mui/styles'

const Analytics = () => {
  const theme = useTheme()

  return (
    <Fragment>
      <div className="analytics m-sm-30 mt-6">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            {/**
             * <StatCards />
             */}
            
            <StatCards2 />
            {/* Top Selling Products */}
            <TopSellingTable />
   
{
  /**
   * <h4 className="card-title text-muted mb-4">Ongoing Projects</h4>
            <RowCards />
   */
}
          </Grid>

          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Card className="px-6 py-4 mb-6">N
              <div className="card-title">Porcentaje de servicios</div>
              <div className="card-subtitle">Ultimo mes</div>
              <DoughnutChart
                height="300px"
                color={[
                  theme.palette.primary.dark,
                  theme.palette.primary.main,
                  theme.palette.primary.light,
                ]}
              />
            </Card>

            {/**
             * <Campaigns />
             */}
            
          </Grid>
        </Grid>
      </div>
    </Fragment>
  )
}

export default Analytics
