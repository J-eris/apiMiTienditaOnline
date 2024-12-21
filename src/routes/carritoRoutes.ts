import { Router } from "express";
import carritoController from "../controllers/CarritoController";
import { authenticate } from "../middleware/authMiddleware";

const CarritoRouter = Router();

CarritoRouter.get("/", authenticate, carritoController.listarCarritos);
CarritoRouter.get(
  "/:idCarrito",
  authenticate,
  carritoController.buscarCarritoPorId
);
CarritoRouter.post("/", authenticate, carritoController.guardarCarrito);
CarritoRouter.patch(
  "/:idCarrito/estado",
  authenticate,
  carritoController.inactivarCarrito
);

export default CarritoRouter;
