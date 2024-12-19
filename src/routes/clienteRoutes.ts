import { Router } from "express";
import { ClienteController } from "../controllers/ClienteController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();
const clienteController = new ClienteController();

router.get("/", authenticate, clienteController.listarClientes);
router.get("/:id", authenticate, clienteController.buscarClientePorId);
router.post("/", authenticate, clienteController.crearCliente);
router.patch("/:id", authenticate, clienteController.actualizarCliente);
router.patch(
  "/estado/:id",
  authenticate,
  clienteController.cambiarEstadoCliente
);

export default router;
