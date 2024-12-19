import { Router } from "express";
import ProductoController from "../controllers/ProductoController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate, ProductoController.listarProductos);
router.get("/:id", authenticate, ProductoController.buscarPorId);
router.post("/", authenticate, ProductoController.crearProducto);
router.patch("/:id", authenticate, ProductoController.actualizarProducto);
router.patch(
  "/:id/estado",
  authenticate,
  ProductoController.cambiarEstadoProducto
);

export default router;
