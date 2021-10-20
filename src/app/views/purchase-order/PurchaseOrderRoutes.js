import AddPurchaseOrder from "./AddPurchaseOrder";
import DetailPurchaseOrder from "./DetailPurchaseOrder";
import ListPurchaseOrder from "./ListPurchaseOrder";

const purchaseOrderRoutes = [
  {
    path: '/orden-de-compra/listar',
    component: ListPurchaseOrder,
  },
  {
    path: '/orden-de-compra/agregar',
    component: AddPurchaseOrder,
  },
  {
    path: '/orden-de-compra/',
    component: DetailPurchaseOrder,
  }
]

export default purchaseOrderRoutes;
