import { Request, Response } from "express";
import authService from "../services/AuthService";
import { sendSuccess, sendError } from "../utils/asyncHandler";

class AuthController {
  registrarUsuario = async (req: Request, res: Response) => {
    try {
      const { body } = req;

      if (!body.correo_electronico || !body.password)
        return sendError(
          res,
          "Datos incompletos para registrar el usuario.",
          400
        );

      if (body.fecha_nacimiento) {
        const fechaNacimiento = new Date(body.fecha_nacimiento);
        const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();

        if (edad >= 18)
          return sendError(res, "Debe ser menor de 18 años para registrarse.");
      }

      if (body.password.length < 8)
        return sendError(res, "Contraseña debe tener al menos 8 caracteres.");

      if (body.telefono && body.telefono.length !== 8)
        return sendError(res, "Telefono debe tener 8 caracteres.");

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
