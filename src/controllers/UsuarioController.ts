import { Request, Response } from "express";
import usuarioService from "../services/UsuarioService";
import { sendError, sendSuccess } from "../utils/asyncHandler";

class UsuarioController {
  async listarUsuarios(req: Request, res: Response) {
    try {
      const usuarios = await usuarioService.listarTodosUsuarios();
      sendSuccess(res, usuarios);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const usuario = await usuarioService.encontrarPorId(
        parseInt(req.params.id)
      );

      if (!usuario) {
        sendError(res, `Usuario con id ${req.params.id} no encontrado.`, 404);
        return;
      }

      sendSuccess(res, usuario);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async buscarPorCorreo(req: Request, res: Response) {
    try {
      const usuario = await usuarioService.encontrarPorCorreo(
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
  }

  async actualizarUsuario(req: Request, res: Response) {
    try {
      const usuarioActualizado = await usuarioService.actualizarUsuario(
        parseInt(req.params.id),
        req.body
      );

      if (!usuarioActualizado)
        return sendError(
          res,
          `Usuario con id ${req.params.id} no encontrado.`,
          404
        );

      sendSuccess(res, usuarioActualizado);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async inactivarUsuario(req: Request, res: Response) {
    try {
      const estadoActualizado = await usuarioService.cambiarEstadoUsuario(
        parseInt(req.params.id),
        req.body
      );

      if (!estadoActualizado) {
        sendError(res, `Usuario con id ${req.params.id} no encontrado.`, 404);
        return;
      }

      sendSuccess(res, estadoActualizado);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}

export default new UsuarioController();
