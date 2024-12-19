import { Router } from "express";
import ProductoController from "../controllers/ProductoController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate, ProductoController.listarProductos);
router.get("/:id", authenticate, ProductoController.buscarProductoPorId);
router.get("/:id/imagen", authenticate, ProductoController.buscarImagenPorId);
router.post("/", authenticate, ProductoController.crearProducto);
router.patch("/:id", authenticate, ProductoController.actualizarProducto);
router.patch(
  "/:id/estado",
  authenticate,
  ProductoController.cambiarEstadoProducto
);
router.delete(
  "/:id/imagen",
  authenticate,
  ProductoController.eliminarImagenProducto
);
router.patch(
  "/:id/imagen",
  authenticate,
  ProductoController.actualizarImagenProducto
);

export default router;
