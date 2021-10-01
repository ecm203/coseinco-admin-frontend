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
  }
]

export default ordersRoutes;
