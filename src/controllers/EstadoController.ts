import { Request, Response } from "express";
import { EstadoService } from "../services/EstadoService";
import { sendError, sendSuccess } from "../utils/asyncHandler";

const estadoService = new EstadoService();

export class EstadoController {
  listarEstados = async (req: Request, res: Response) => {
    try {
      const estados = await estadoService.listarTodosEstados();
      sendSuccess(res, estados);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  buscarPorId = async (req: Request, res: Response) => {
    try {
      const estado = await estadoService.encontrarPorId(
        parseInt(req.params.id)
      );

      if (!estado)
        return sendError(
          res,
          `Estado con id ${req.params.id} no encontrado.`,
          404
        );

      sendSuccess(res, estado);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  crearEstado = async (req: Request, res: Response) => {
    try {
      const estado = await estadoService.crearNuevoEstado(req.body);

      if (!estado) return sendError(res, `Estado ya existe.`, 400);

      sendSuccess(res, estado, 201);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  actualizarEstado = async (req: Request, res: Response) => {
    try {
      const estadoActualizado = await estadoService.actualizarEstado(
        parseInt(req.params.id),
        req.body
      );

      if (!estadoActualizado)
        return sendError(
          res,
          `Estado con id ${req.params.id} no encontrado.`,
          404
        );

      sendSuccess(res, estadoActualizado);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };
}
