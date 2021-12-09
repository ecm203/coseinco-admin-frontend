import React, { useEffect, useState } from 'react'
import { Grid, Card } from '@mui/material'
import DoughnutChart from './shared/Doughnut'
import StatCards from './shared/StatCards'
import TopSellingTable from './shared/TopSellingTable'
import { useTheme } from '@mui/styles'
import { MaxtBackdrop } from 'app/components'
import axios from 'axios'

const Analytics = () => {
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState(null)

  useEffect(() => {
    if (dashboardData === null) {
      axios.get('http://localhost:5000/api/pedidos/admin/dashboard/').then((response) => {
        setDashboardData(response.data)
        setIsLoading(false);
      }, error => {
        setIsLoading(false);
      })
    }
  }, [dashboardData])
  return (
    <>
      {isLoading ? (
        <MaxtBackdrop isOpen={isLoading} />
      ) : (
        <div className="analytics m-sm-30 mt-6">
          <Grid container spacing={3}>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <StatCards data={{
                clientes: dashboardData?.clientes,
                ordenes: dashboardData?.ordenes,
                ventasDelDia: dashboardData?.ventasDelDia,
                pedidosPorEnviar: dashboardData?.pedidosPorEnviar
              }}/>
              <TopSellingTable data={dashboardData?.inventarioLow}/>
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Card className="px-6 py-4 mb-6">
                <div className="card-title">Pedidos</div>
                <div className="card-subtitle">Por estado</div>
                <DoughnutChart
                  height="440px"
                  data={[
                    {value: dashboardData?.donutPedidos.pedidoGenerado, name: 'Generado'},
                    {value: dashboardData?.donutPedidos.pedidoReservado, name: 'Reservado'},
                    {value: dashboardData?.donutPedidos.pedidoEmpaquetado, name: 'Empaquetado'},
                    {value: dashboardData?.donutPedidos.pedidoEnviado, name: 'Enviado'},
                    {value: dashboardData?.donutPedidos.pedidoFinalizado, name: 'Finalizado'},
                  ]}
                  color={[
                    theme.palette.primary.dark,
                    theme.palette.primary.main,
                    theme.palette.primary.light,
                  ]}
                />
              </Card>
              <Card className="px-6 py-4 mb-6">
                <div className="card-title">Ordenes de compra</div>
                <div className="card-subtitle">Por estado</div>
                <DoughnutChart
                  height="300px"
                  data={[
                    {value: dashboardData?.donutCompras.compraCotizado, name: 'Cotizado'},
                    {value: dashboardData?.donutCompras.compraProcesado, name: 'OC'},
                    {value: dashboardData?.donutCompras.compraAnulado, name: 'Procesado'},
                    {value: dashboardData?.donutCompras.compraFinalizado, name: 'Finalizado'},
                  ]}
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
      )}
    </>
  )
}

export default Analytics
