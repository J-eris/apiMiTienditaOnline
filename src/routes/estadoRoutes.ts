import { Router } from "express";
import { EstadoController } from "../controllers/EstadoController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();
const estadoController = new EstadoController();

router.get("/", authenticate, estadoController.listarEstados);
router.get("/:id", authenticate, estadoController.buscarPorId);
router.post("/", authenticate, estadoController.crearEstado);
router.patch("/:id", authenticate, estadoController.actualizarEstado);
// router.patch("/:id", authenticate, estadoController.eliminar);

export default router;
