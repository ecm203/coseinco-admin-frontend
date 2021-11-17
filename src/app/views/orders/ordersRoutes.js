import AddSerialNumb from "./AddSerialNumb";
import BookOrder from "./BookOrder";
import SendOrder from "./SendOrder";

const ordersRoutes = [
  {
    path: '/pedidos/reservar',
    component: BookOrder,
  },
  {
    path: '/pedidos/enviar',
    component: SendOrder,
  },
  {
    path: '/pedidos/',
    component: AddSerialNumb,
  },
]

export default ordersRoutes;
