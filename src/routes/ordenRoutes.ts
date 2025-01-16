import { Router } from "express";
import OrdenController from "../controllers/OrdenController";
import { authenticate } from "../middleware/authMiddleware";

const ordenRouter = Router();

ordenRouter.get(
  "/totalQuetzalesAgosto",
  authenticate,
  OrdenController.obtenerTotalQuetzalesAgosto
);
ordenRouter.get(
  "/:idUsuario/pedidos",
  authenticate,
  OrdenController.obtenerOrdenesPorUsuario
);

ordenRouter.get("/", authenticate, OrdenController.listarOrdenes);
ordenRouter.get("/:idOrden", authenticate, OrdenController.buscarOrdenPorId);
ordenRouter.get(
  "/:idOrden/detalles",
  authenticate,
  OrdenController.obtenerDetallesOrden
);
ordenRouter.post("/", authenticate, OrdenController.crearOrden);
ordenRouter.patch("/:idOrden", authenticate, OrdenController.actualizarOrden);
ordenRouter.patch(
  "/:idOrden/estado",
  authenticate,
  OrdenController.cambiarEstadoOrden
);

export default ordenRouter;
