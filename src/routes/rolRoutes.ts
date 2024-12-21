import { Router } from "express";
import rolController from "../controllers/RolController";
import { authenticate } from "../middleware/authMiddleware";

const RolRouter = Router();

RolRouter.get("/", authenticate, rolController.listarRoles);
RolRouter.get("/:idRol", authenticate, rolController.buscarRolPorId);
RolRouter.post("/", authenticate, rolController.crearRol);
RolRouter.patch("/:idRol", authenticate, rolController.actualizarRol);
// RolRouter.patch("/:id", authenticate, rolController.eliminar);

export default RolRouter;
