import AddPurchaseOrder from "./AddPurchaseOrder";
import ExitMovement from "./ExitMovement";
import IncomeMovement from "./IncomeMovement";

const purchaseOrderRoutes = [
  {
    path: '/orden-de-compra/movimiento/ingreso',
    component: IncomeMovement,
  },
  {
    path: '/orden-de-compra/movimiento/salida',
    component: ExitMovement,
  },
  {
    path: '/orden-de-compra/agregar',
    component: AddPurchaseOrder,
  }
]

export default purchaseOrderRoutes;
