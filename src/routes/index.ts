import { Router } from "express";
import authRoutes from "./authRoutes";
import usuarioRoutes from "./usuarioRoutes";
import clienteRoutes from "./clienteRoutes";
import estadoRoutes from "./estadoRoutes";
import rolRoutes from "./rolRoutes";
import productoRoutes from "./productoRoutes";
import categoriaRoutes from "./categoriaRoutes";
import ordenRoutes from "./ordenRoutes";
import carritoRoutes from "./carritoRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/clientes", clienteRoutes);
router.use("/estados", estadoRoutes);
router.use("/roles", rolRoutes);
router.use("/productos", productoRoutes);
router.use("/categorias", categoriaRoutes);
router.use("/ordenes", ordenRoutes);
router.use("/carritos", carritoRoutes);

router.get("/", (req, res, next) => {
  res.json({ message: "API v1" });
});

export default router;
