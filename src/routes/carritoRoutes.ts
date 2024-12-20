import { Router } from "express";
import carritoController from "../controllers/CarritoController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate, carritoController.listarCarritos);
router.get("/:idCarrito", authenticate, carritoController.buscarCarritoPorId);
router.post("/", authenticate, carritoController.guardarCarrito);
router.patch(
  "/:idCarrito/estado",
  authenticate,
  carritoController.inactivarCarrito
);

export default router;
