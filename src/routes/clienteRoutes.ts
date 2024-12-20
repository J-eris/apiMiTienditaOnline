import { Router } from "express";
import { ClienteController } from "../controllers/ClienteController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();
const clienteController = new ClienteController();

router.get("/", authenticate, clienteController.listarClientes);
router.get("/:idCliente", authenticate, clienteController.buscarClientePorId);
router.post("/", authenticate, clienteController.crearCliente);
router.patch("/:idCliente", authenticate, clienteController.actualizarCliente);
router.patch(
  "/estado/:idCliente",
  authenticate,
  clienteController.cambiarEstadoCliente
);

export default router;
