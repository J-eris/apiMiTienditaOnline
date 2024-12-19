import { Router } from "express";
import OrdenController from "../controllers/OrdenController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate, OrdenController.listarOrdenes);
router.get("/:id", authenticate, OrdenController.buscarPorId);
router.post("/", authenticate, OrdenController.crearOrden);
router.patch("/:id", authenticate, OrdenController.actualizarOrden);
router.patch("/:id/estado", authenticate, OrdenController.cambiarEstadoOrden);

export default router;
