import { Router } from "express";
import ProductoController from "../controllers/ProductoController";
import { authenticate } from "../middleware/authMiddleware";

const ProductoRouter = Router();

ProductoRouter.get("/", authenticate, ProductoController.listarProductos);
ProductoRouter.get(
  "/:idProducto",
  authenticate,
  ProductoController.buscarProductoPorId
);
ProductoRouter.get(
  "/:idImagen/imagen",
  authenticate,
  ProductoController.buscarImagenPorId
);
ProductoRouter.post("/", authenticate, ProductoController.crearProducto);
ProductoRouter.patch(
  "/:idProducto",
  authenticate,
  ProductoController.actualizarProducto
);
ProductoRouter.patch(
  "/:idProducto/estado",
  authenticate,
  ProductoController.cambiarEstadoProducto
);
ProductoRouter.patch(
  "/:idProducto/stock",
  authenticate,
  ProductoController.actualizarStockProducto
);
ProductoRouter.get(
  "/:idProducto/detalle",
  authenticate,
  ProductoController.obtenerDetallesProducto
);
ProductoRouter.get(
  "/:idCategoria/productos",
  authenticate,
  ProductoController.obtenerProductosPorCategoria
);
ProductoRouter.patch(
  "/:idImagen/imagen",
  authenticate,
  ProductoController.actualizarImagenProducto
);
ProductoRouter.delete(
  "/:idImagen/imagen",
  authenticate,
  ProductoController.eliminarImagenProducto
);

export default ProductoRouter;
