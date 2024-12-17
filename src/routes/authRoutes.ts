import { Router } from "express";
import authController from "../controllers/AuthController";

const authRouter = Router();

authRouter.post("/register", authController.registrarUsuario);
authRouter.post("/login", authController.loginUsuario);
authRouter.post("/logout", authController.logoutUsuario);

export default authRouter;
