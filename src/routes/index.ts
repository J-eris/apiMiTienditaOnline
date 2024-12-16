import { Router } from "express";
import authRoutes from "./authRoutes";
import usuarioRoutes from "./usuarioRoutes";
import clienteRoutes from "./clienteRoutes";
import estadoRoutes from "./estadoRoutes";
import rolRoutes from "./rolRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/clientes", clienteRoutes);
router.use("/estados", estadoRoutes);
router.use("/roles", rolRoutes);

export default router;
