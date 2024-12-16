import { Request, Response } from "express";
import authService from "../services/AuthService";
import { sendSuccess, sendError } from "../utils/asyncHandler";

class AuthController {
  async registrarUsuario(req: Request, res: Response) {
    try {
      const usuario = await authService.registrarNuevoUsuario(req.body);
      if (!usuario) {
        sendError(res, `No se pudo registrar el usuario.`, 500);
      }

      sendSuccess(res, usuario, 201);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async loginUsuario(req: Request, res: Response) {
    try {
      const usuario = await authService.loginUsuario(
        req.body.email,
        req.body.password
      );
      if (!usuario) {
        sendError(res, `Credenciales inválidas.`, 400);
      }

      sendSuccess(res, usuario);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}

export default new AuthController();
