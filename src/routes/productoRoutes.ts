import { Router } from "express";
import ProductoController from "../controllers/ProductoController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate, ProductoController.listarProductos);
router.get(
  "/:idProducto",
  authenticate,
  ProductoController.buscarProductoPorId
);
router.get(
  "/:idImagen/imagen",
  authenticate,
  ProductoController.buscarImagenPorId
);
router.post("/", authenticate, ProductoController.crearProducto);
router.patch(
  "/:idProducto",
  authenticate,
  ProductoController.actualizarProducto
);
router.patch(
  "/:idProducto/estado",
  authenticate,
  ProductoController.cambiarEstadoProducto
);
router.delete(
  "/:idImagen/imagen",
  authenticate,
  ProductoController.eliminarImagenProducto
);
router.patch(
  "/:idImagen/imagen",
  authenticate,
  ProductoController.actualizarImagenProducto
);

export default router;
