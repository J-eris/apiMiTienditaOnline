import { Request, Response } from "express";
import { EstadoService } from "../services/EstadoService";
import { sendError, sendSuccess } from "../utils/asyncHandler";

const estadoService = new EstadoService();

class EstadoController {
  listarEstados = async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 10 } = req.query;

      const estados = await estadoService.listarTodosEstados(
        Number(page),
        Number(limit)
      );
      sendSuccess(res, estados);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  buscarEstadoPorId = async (req: Request, res: Response) => {
    try {
      const estado = await estadoService.encontrarEstadoPorId(
        parseInt(req.params.idEstado)
      );

      if (!estado)
        return sendError(
          res,
          `Estado con id ${req.params.idEstado} no encontrado.`,
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
        params: { idEstado },
      } = req;

      if (!body.nombre)
        return sendError(
          res,
          "Datos incompletos para actualizar el estado.",
          400
        );

      const estadoActualizado = await estadoService.actualizarEstado(
        parseInt(idEstado),
        body
      );

      if (!estadoActualizado)
        return sendError(
          res,
          `Estado con id ${req.params.idEstado} no encontrado.`,
          404
        );

      sendSuccess(res, estadoActualizado);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };
}

export default new EstadoController();
