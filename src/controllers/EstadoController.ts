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
      const { body } = req;

      if (!body.nombre)
        return sendError(res, "Nombre de estado no especificado.", 400);

      const nuevoEstado = await estadoService.crearNuevoEstado(body);

      if (!nuevoEstado) return sendError(res, `Estado ya existe.`, 400);

      sendSuccess(res, nuevoEstado, 201);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  actualizarEstado = async (req: Request, res: Response) => {
    try {
      const {
        body,
        params: { id },
      } = req;

      if (!body.nombre)
        return sendError(
          res,
          "Datos incompletos para actualizar el estado.",
          400
        );

      const estadoActualizado = await estadoService.actualizarEstado(
        parseInt(id),
        body
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
