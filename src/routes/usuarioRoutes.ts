import { Router } from "express";
import usuarioController from "../controllers/UsuarioController";
import { authenticate } from "../middleware/authMiddleware";

const usuarioRouter = Router();

usuarioRouter.get("/", authenticate, usuarioController.listarUsuarios);
usuarioRouter.get(
  "/:idUsuario",
  authenticate,
  usuarioController.buscarUsuarioPorId
);
usuarioRouter.get(
  "/correo/:correo",
  authenticate,
  usuarioController.buscarUsuarioPorCorreo
);
usuarioRouter.patch(
  "/:idUsuario",
  authenticate,
  usuarioController.actualizarUsuario
);
usuarioRouter.patch(
  "/estado/:idUsuario",
  authenticate,
  usuarioController.inactivarUsuario
);

export default usuarioRouter;
