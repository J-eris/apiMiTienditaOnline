import { Request, Response } from "express";
import { EstadoService } from "../services/EstadoService";
import { sendError, sendSuccess } from "../utils/asyncHandler";

const estadoService = new EstadoService();

export class EstadoController {
  async listarEstados(req: Request, res: Response) {
    try {
      const estados = await estadoService.listarTodosEstados();
      sendSuccess(res, estados);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async buscarPorId(req: Request, res: Response) {
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
  }

  async crearEstado(req: Request, res: Response) {
    try {
      const estado = await estadoService.crearNuevoEstado(req.body);

      if (!estado) return sendError(res, `Estado ya existe.`, 400);

      sendSuccess(res, estado, 201);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async actualizarEstado(req: Request, res: Response) {
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
  }
}
