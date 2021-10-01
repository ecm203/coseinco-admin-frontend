import AddUsser from './AddUsser';
import ListUser from './ListUser';

const usersRoutes = [
  {
    path: '/usuarios/agregar',
    component: AddUsser,
  },
  {
    path: '/usuarios/listar',
    component: ListUser,
  }
]

export default usersRoutes;
