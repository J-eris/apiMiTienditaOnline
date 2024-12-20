import { Router } from "express";
import CategoriaController from "../controllers/CategoriaController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate, CategoriaController.listarCategorias);
router.get(
  "/:idCategoria",
  authenticate,
  CategoriaController.buscarCategoriaPorId
);
router.post("/", authenticate, CategoriaController.crearCategoria);
router.patch(
  "/:idCategoria",
  authenticate,
  CategoriaController.actualizarCategoria
);
router.patch(
  "/:id/estado",
  authenticate,
  CategoriaController.cambiarEstadoCategoria
);

export default router;
