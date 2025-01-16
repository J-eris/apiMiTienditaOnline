import { Router } from "express";
import usuarioController from "../controllers/UsuarioController";
import { authenticate } from "../middleware/authMiddleware";
import OrdenController from "../controllers/OrdenController";

const usuarioRouter = Router();

usuarioRouter.get("/", authenticate, usuarioController.listarUsuarios);
usuarioRouter.get(
  "/:idUsuario",
  authenticate,
  usuarioController.buscarUsuarioPorId
);
usuarioRouter.get(
  "/:correo/correo",
  authenticate,
  usuarioController.buscarUsuarioPorCorreo
);
usuarioRouter.patch(
  "/:idUsuario",
  authenticate,
  usuarioController.actualizarUsuario
);
usuarioRouter.patch(
  "/:idUsuario/estado",
  authenticate,
  usuarioController.inactivarUsuario
);
usuarioRouter.get(
  "/:idUsuario/carritos",
  authenticate,
  usuarioController.obtenerCarritoUsuario
);

export default usuarioRouter;
