import { Router } from "express";
import clienteController from "../controllers/ClienteController";
import { authenticate } from "../middleware/authMiddleware";

const clienteRouter = Router();

clienteRouter.get(
  "/clientesMayorConsumo",
  authenticate,
  clienteController.obtener10ClientesMayorConsumo
);

clienteRouter.get("/", authenticate, clienteController.listarClientes);
clienteRouter.get(
  "/:idCliente",
  authenticate,
  clienteController.buscarClientePorId
);
clienteRouter.post("/", authenticate, clienteController.crearCliente);
clienteRouter.patch(
  "/:idCliente",
  authenticate,
  clienteController.actualizarCliente
);
clienteRouter.patch(
  "/:idCliente/estado",
  authenticate,
  clienteController.cambiarEstadoCliente
);

export default clienteRouter;
