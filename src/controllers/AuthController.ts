import { Request, Response } from "express";
import authService from "../services/AuthService";
import { sendSuccess, sendError } from "../utils/asyncHandler";

class AuthController {
  registrarUsuario = async (req: Request, res: Response) => {
    try {
      const usuario = await authService.registrarNuevoUsuario(req.body);

      if (!usuario) return sendError(res, `Usuario ya existe.`, 400);

      sendSuccess(res, usuario, 201);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  loginUsuario = async (req: Request, res: Response) => {
    try {
      const usuario = await authService.loginUsuario(
        req.body.email,
        req.body.password
      );

      if (!usuario) return sendError(res, `Credenciales inválidas.`, 400);

      sendSuccess(res, usuario);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };
}

export default new AuthController();
