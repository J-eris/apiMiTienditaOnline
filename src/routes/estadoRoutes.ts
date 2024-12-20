import { Router } from "express";
import { EstadoController } from "../controllers/EstadoController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();
const estadoController = new EstadoController();

router.get("/", authenticate, estadoController.listarEstados);
router.get("/:idEstado", authenticate, estadoController.buscarEstadoPorId);
router.post("/", authenticate, estadoController.crearEstado);
router.patch("/:idEstado", authenticate, estadoController.actualizarEstado);
// router.patch("/:id", authenticate, estadoController.eliminar);

export default router;
