import React from 'react'
import { Redirect } from 'react-router-dom'

import dashboardRoutes from './views/dashboard/DashboardRoutes'
import utilitiesRoutes from './views/utilities/UtilitiesRoutes'

import materialRoutes from './views/material-kit/MaterialRoutes'
import chartsRoute from './views/charts/ChartsRoute'
import dragAndDropRoute from './views/Drag&Drop/DragAndDropRoute'

import formsRoutes from './views/forms/FormsRoutes'
import mapRoutes from './views/map/MapRoutes'
import usersRoutes from './views/users/UsersRoutes'
import productsRoutes from './views/products/ProductsRoutes'
import inventoryRoutes from './views/inventory/InventoryRouters'
import ordersRoutes from './views/orders/ordersRoutes'
import suppliersRoutes from './views/suppliers/SuppliersRouters'
import purchaseOrderRoutes from './views/purchase-order/PurchaseOrderRoutes'
import movementRoutes from './views/movement/MovementRoutes'


const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard/default" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...dashboardRoutes,
    ...materialRoutes,
    ...utilitiesRoutes,
    ...chartsRoute,
    ...dragAndDropRoute,
    ...usersRoutes,
    ...productsRoutes,
    ...inventoryRoutes,
    ...ordersRoutes,
    ...suppliersRoutes,
    ...purchaseOrderRoutes,
    ...movementRoutes,
    ...formsRoutes,
    ...mapRoutes,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
