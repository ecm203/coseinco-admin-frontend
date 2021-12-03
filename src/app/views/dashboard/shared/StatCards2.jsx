import React from 'react'
import { Grid, Card, Icon, Fab } from '@mui/material'

const StatCards2 = () => {
    return (
        <Grid container spacing={3} className="mb-6">
            <Grid item xs={12} md={6}>
                <Card elevation={3} className="p-4">
                    <div className="flex items-center">
                        <Fab
                            size="medium"
                            className="bg-light-green circle-44 box-shadow-none"
                        >
                            <Icon className="text-green">trending_up</Icon>
                        </Fab>
                        <h5 className="font-medium text-green m-0 ml-3">
                            Ventas del Mes
                        </h5>
                    </div>
                    <div className="pt-4 flex items-center">
                        <h2 className="m-0 text-muted flex-grow">S/. 10.8k</h2>
                        <div className="flex justify-center items-centerml-3 h-16 w-16 rounded bg-green text-white">
                            <Icon className="text-14">expand_less</Icon>
                        </div>
                        <span className="text-13 text-green ml-1"> (+21%)</span>
                    </div>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card elevation={3} className="p-4">
                    <div className="flex items-center">
                        <Fab
                            size="medium"
                            className="bg-light-error circle-44 box-shadow-none"
                        >
                            <Icon className="text-error">trending_up</Icon>
                        </Fab>
                        <h5 className="font-medium text-error m-0 ml-3">
                            Compras del Mes
                        </h5>
                    </div>
                    <div className="pt-4 flex items-center">
                        <h2 className="m-0 text-muted flex-grow">S/. 4.5k</h2>
                        <div className="flex justify-center items-centerml-3 h-16 w-16 rounded bg-green text-white">
                            <Icon className="text-14">expand_less</Icon>
                        </div>
                        <span className="text-13 text-green ml-1"> (+21%)</span>
                    </div>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card elevation={3} className="p-4">
                    <div className="flex items-center">
                        <h5 className="font-medium text-muted m-0 ml-3">
                            Pedidos del Cliente
                        </h5>
                    </div>
                    <div className="pt-4 flex items-center">
                        <h2 className="m-0 text-muted flex-grow">138</h2>
                        <div className="flex justify-center items-centerml-3 h-16 w-16 rounded bg-error text-white">
                            <Icon className="text-14">expand_less</Icon>
                        </div>
                        <span className="text-13 text-error ml-1">(+21%)</span>
                    </div>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card elevation={3} className="p-4">
                    <div className="flex items-center">
                        <h5 className="font-medium text-muted m-0 ml-3">
                            Pedidos para el Proveedor
                        </h5>
                    </div>
                    <div className="pt-4 flex items-center">
                        <h2 className="m-0 text-muted flex-grow">168</h2>
                        <div className="flex justify-center items-centerml-3 h-16 w-16 rounded bg-error text-white">
                            <Icon className="text-14">expand_less</Icon>
                        </div>
                        <span className="text-13 text-error ml-1">(+21%)</span>
                    </div>
                </Card>
            </Grid>
        </Grid>
    )
}

export default StatCards2
