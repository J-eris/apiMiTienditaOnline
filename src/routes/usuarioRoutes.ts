import { Router } from "express";
import usuarioController from "../controllers/UsuarioController";
import { authenticate } from "../middleware/authMiddleware";

const usuarioRouter = Router();

usuarioRouter.get("/", authenticate, usuarioController.listarUsuarios);
usuarioRouter.get("/:id", authenticate, usuarioController.buscarUsuarioPorId);
usuarioRouter.get(
  "/correo/:correo",
  authenticate,
  usuarioController.buscarUsuarioPorCorreo
);
usuarioRouter.patch("/:id", authenticate, usuarioController.actualizarUsuario);
usuarioRouter.patch(
  "/estado/:id",
  authenticate,
  usuarioController.inactivarUsuario
);

export default usuarioRouter;
