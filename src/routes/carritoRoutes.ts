import { Router } from "express";
import carritoController from "../controllers/CarritoController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate, carritoController.listarCarritos);
router.get("/:id", authenticate, carritoController.buscarCarritoPorId);
router.post("/", authenticate, carritoController.guardarCarrito);
router.delete("/:id", authenticate, carritoController.eliminarCarrito);

export default router;
