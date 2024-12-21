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

      if (!body.correo_electronico)
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

  obtenerOrdenesPorUsuario = async (req: Request, res: Response) => {
    try {
      const ordenes = await usuarioService.obtenerOrdenesPorUsuario(
        parseInt(req.params.idUsuario)
      );

      if (!ordenes)
        return sendError(
          res,
          `Ordenes del usuario con id ${req.params.idUsuario} no encontradas.`,
          404
        );

      sendSuccess(res, ordenes);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  obtenerCarritoUsuario = async (req: Request, res: Response) => {
    try {
      const carrito = await usuarioService.obtenerCarritoUsuario(
        parseInt(req.params.idUsuario)
      );

      if (!carrito)
        return sendError(
          res,
          `Carrito del usuario con id ${req.params.idUsuario} no encontrado.`,
          404
        );

      sendSuccess(res, carrito);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  inactivarUsuario = async (req: Request, res: Response) => {
    try {
      const {
        body,
        params: { idUsuario },
      } = req;

      if (!body.estado_idestado)
        return sendError(
          res,
          "Datos incompletos para actualizar el estado del usuario.",
          400
        );

      const estadoActualizado = await usuarioService.cambiarEstadoUsuario(
        parseInt(idUsuario),
        body
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
