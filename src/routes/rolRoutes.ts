import { Router } from "express";
import { RolController } from "../controllers/RolController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();
const rolController = new RolController();

router.get("/", authenticate, rolController.listarRoles);
router.get("/:idRol", authenticate, rolController.buscarRolPorId);
router.post("/", authenticate, rolController.crearRol);
router.patch("/:idRol", authenticate, rolController.actualizarRol);
// router.patch("/:id", authenticate, rolController.eliminar);

export default router;
