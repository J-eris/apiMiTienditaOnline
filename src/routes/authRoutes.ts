import { Router } from "express";
import authController from "../controllers/AuthController";

const authRouter = Router();

authRouter.post("/register", authController.registrarUsuario);
authRouter.post("/login", authController.loginUsuario);

export default authRouter;