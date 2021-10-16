import AddSerialNumb from "./AddSerialNumb";
import BookOrder from "./BookOrder";

const ordersRoutes = [
  {
    path: '/pedidos/reservar',
    component: BookOrder,
  },
  {
    path: '/pedidos/',
    component: AddSerialNumb,
  }
]

export default ordersRoutes;
