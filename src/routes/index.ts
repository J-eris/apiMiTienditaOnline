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
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = Router();

router.use("/auth", authRoutes);
router.use(
  "/usuarios",
  authenticate,
  authorize(["admin", "operador"]),
  usuarioRoutes
);
router.use(
  "/clientes",
  authenticate,
  authorize(["admin", "operador"]),
  clienteRoutes
);
router.use(
  "/estados",
  authenticate,
  authorize(["admin", "operador"]),
  estadoRoutes
);
router.use("/roles", authenticate, authorize(["admin"]), rolRoutes);
router.use(
  "/productos",
  authenticate,
  authorize(["admin", "operador", "cliente"]),
  productoRoutes
);
router.use(
  "/categorias",
  authenticate,
  authorize(["admin", "operador"]),
  categoriaRoutes
);

router.use(
  "/ordenes",
  authenticate,
  authorize(["admin", "operador", "cliente"]),
  ordenRoutes
);
router.use(
  "/carritos",
  authenticate,
  authorize(["admin", "operador", "cliente"]),
  carritoRoutes
);

router.get("/", (req, res, next) => {
  res.json({ message: "API v1" });
});

export default router;
