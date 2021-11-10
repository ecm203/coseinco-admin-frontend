import AddProduct from "./AddProduct"
import ListProduct from "./ListProduct"
import ProductDetail from "./ProductDetail";


const productsRoutes = [
  {
    path: '/producto/agregar',
    component: AddProduct,
  },
  {
    path: '/producto/listar',
    component: ListProduct,
  },
  {
    path: '/producto/',
    component: ProductDetail,
  }
]

export default productsRoutes;
