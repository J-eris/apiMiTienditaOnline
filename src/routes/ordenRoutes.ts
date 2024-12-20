import { Router } from "express";
import OrdenController from "../controllers/OrdenController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate, OrdenController.listarOrdenes);
router.get("/:idOrden", authenticate, OrdenController.buscarOrdenPorId);
router.post("/", authenticate, OrdenController.crearOrden);
router.patch("/:idOrden", authenticate, OrdenController.actualizarOrden);
router.patch(
  "/:idOrden/estado",
  authenticate,
  OrdenController.cambiarEstadoOrden
);

export default router;
