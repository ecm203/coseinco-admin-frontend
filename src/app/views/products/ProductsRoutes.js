import AddProduct from "./AddProduct"
import ListProduct from "./ListProduct"


const productsRoutes = [
  {
    path: '/producto/agregar',
    component: AddProduct,
  },
  {
    path: '/producto/editar',
    component: AddProduct,
  },
  {
    path: '/producto/listar',
    component: ListProduct,
  }
]

export default productsRoutes;
