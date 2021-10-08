import AddPurchaseOrder from "./AddPurchaseOrder";
import ListPurchaseOrder from "./ListPurchaseOrder";

const purchaseOrderRoutes = [
  {
    path: '/orden-de-compra/listar',
    component: ListPurchaseOrder,
  },
  {
    path: '/orden-de-compra/agregar',
    component: AddPurchaseOrder,
  }
]

export default purchaseOrderRoutes;
