import ExitMovement from "./ExitMovement";
import IncomeMovement from "./IncomeMovement";

const movementRoutes = [
  {
    path: '/movimiento/salida',
    component: ExitMovement,
  },
  {
    path: '/movimiento/ingreso',
    component: IncomeMovement,
  }
]

export default movementRoutes;
