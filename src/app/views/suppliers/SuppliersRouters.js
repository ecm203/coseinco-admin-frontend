import AddSupplier from "./AddSupplier";
import ListSupplier from "./ListSupplier";

const suppliersRoutes = [
  {
    path: '/proveedor/agregar',
    component: AddSupplier,
  },
  {
    path: '/proveedor/listar',
    component: ListSupplier,
  }
]

export default suppliersRoutes;
