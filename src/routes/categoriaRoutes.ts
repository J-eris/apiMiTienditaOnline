import { Router } from "express";
import CategoriaController from "../controllers/CategoriaController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate, CategoriaController.listarCategorias);
router.get("/:id", authenticate, CategoriaController.buscarPorId);
router.post("/", authenticate, CategoriaController.crearCategoria);
router.patch("/:id", authenticate, CategoriaController.actualizarCategoria);
router.patch(
  "/:id/estado",
  authenticate,
  CategoriaController.cambiarEstadoCategoria
);

export default router;
