import NotFound from './NotFound'
import ForgotPassword from './ForgotPassword'
import JwtRegister from './register/JwtRegister'
import JwtLogin from './login/JwtLogin'
import SupplierPurchaseOrder from '../purchase-order/SupplierPurchaseOrder'

const sessionRoutes = [
    {
        path: '/session/signup',
        component: JwtRegister,
    },
    {
        path: '/session/signin',
        component: JwtLogin,
    },
    {
        path: '/session/forgot-password',
        component: ForgotPassword,
    },
    {
        path: '/session/404',
        component: NotFound,
    },
    {
        path: '/proveedor',
        component: SupplierPurchaseOrder
    }
]

export default sessionRoutes
