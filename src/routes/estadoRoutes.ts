import { Router } from "express";
import estadoController from "../controllers/EstadoController";
import { authenticate } from "../middleware/authMiddleware";

const estadoRouter = Router();

estadoRouter.get("/", authenticate, estadoController.listarEstados);
estadoRouter.get(
  "/:idEstado",
  authenticate,
  estadoController.buscarEstadoPorId
);
estadoRouter.post("/", authenticate, estadoController.crearEstado);
estadoRouter.patch(
  "/:idEstado",
  authenticate,
  estadoController.actualizarEstado
);

export default estadoRouter;
