import AddSerialNumb from "./AddSerialNumb";
import BookOrder from "./BookOrder";
import ListOrder from "./ListOrder";

const ordersRoutes = [
  {
    path: '/pedidos/reservar',
    component: BookOrder,
  },
  {
    path: '/pedidos/listar',
    component: ListOrder,
  },
  {
    path: '/pedidos/id/:orderNum',
    component: AddSerialNumb,
  }
]

export default ordersRoutes;
