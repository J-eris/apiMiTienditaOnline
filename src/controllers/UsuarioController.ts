import { Request, Response } from "express";
import usuarioService from "../services/UsuarioService";
import { sendError, sendSuccess } from "../utils/asyncHandler";

class UsuarioController {
  listarUsuarios = async (req: Request, res: Response) => {
    try {
      const usuarios = await usuarioService.listarTodosUsuarios();
      sendSuccess(res, usuarios);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  buscarUsuarioPorId = async (req: Request, res: Response) => {
    try {
      const usuario = await usuarioService.encontrarUsuarioPorId(
        parseInt(req.params.idUsuario)
      );

      if (!usuario) {
        sendError(
          res,
          `Usuario con id ${req.params.idUsuario} no encontrado.`,
          404
        );
        return;
      }

      sendSuccess(res, usuario);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  buscarUsuarioPorCorreo = async (req: Request, res: Response) => {
    try {
      const usuario = await usuarioService.encontrarUsuarioPorCorreo(
        req.params.correo
      );

      if (!usuario) {
        sendError(
          res,
          `Usuario con correo ${req.params.correo} no encontrado.`,
          404
        );
        return;
      }

      sendSuccess(res, usuario);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  actualizarUsuario = async (req: Request, res: Response) => {
    try {
      const {
        body,
        params: { idUsuario },
      } = req;

      if (!body.correo_electronico || !body.password)
        return sendError(
          res,
          "Datos incompletos para actualizar el usuario.",
          400
        );

      const usuarioActualizado = await usuarioService.actualizarUsuario(
        parseInt(idUsuario),
        body
      );

      if (!usuarioActualizado)
        return sendError(
          res,
          `Usuario con id ${req.params.idUsuario} no encontrado.`,
          404
        );

      sendSuccess(res, usuarioActualizado);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  inactivarUsuario = async (req: Request, res: Response) => {
    try {
      const estadoActualizado = await usuarioService.cambiarEstadoUsuario(
        parseInt(req.params.idUsuario),
        req.body
      );

      if (!estadoActualizado) {
        sendError(
          res,
          `Usuario con id ${req.params.idUsuario} no encontrado.`,
          404
        );
        return;
      }

      sendSuccess(res, estadoActualizado);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };
}

export default new UsuarioController();
