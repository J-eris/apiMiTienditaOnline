import { Router } from "express";
import authRoutes from "./authRoutes";
import usuarioRoutes from "./usuarioRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/usuarios", usuarioRoutes);

export default router;
