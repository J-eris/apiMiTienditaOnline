import { Request, Response } from "express";
import authService from "../services/AuthService";
import { sendSuccess, sendError } from "../utils/asyncHandler";

class AuthController {
  registrarUsuario = async (req: Request, res: Response) => {
    try {
      const { body } = req;

      if (!body.email || !body.password)
        return sendError(
          res,
          "Datos incompletos para registrar el usuario.",
          400
        );

      const nuevoUsuario = await authService.registrarNuevoUsuario(body);

      if (!nuevoUsuario) return sendError(res, `Usuario ya existe.`, 400);

      sendSuccess(res, nuevoUsuario, 201);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  loginUsuario = async (req: Request, res: Response) => {
    try {
      const { body } = req;

      if (!body.email || !body.password)
        return sendError(res, "Datos incompletos para iniciar sesión.", 400);

      const loginResponse = await authService.loginUsuario(
        req.body.email,
        req.body.password
      );

      if (!loginResponse) return sendError(res, `Credenciales inválidas.`, 400);

      sendSuccess(res, loginResponse);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  logoutUsuario = async (req: Request, res: Response) => {
    try {
      res.clearCookie("token");
      sendSuccess(res, "Logout exitoso.");
    } catch (error: any) {
      sendError(res, error.message);
    }
  };
}

export default new AuthController();
