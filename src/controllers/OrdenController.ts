import { Request, Response } from "express";
import ordenService from "../services/OrdenService";
import { sendError, sendSuccess } from "../utils/asyncHandler";

export class OrdenController {
  listarOrdenes = async (req: Request, res: Response) => {
    try {
      const ordenes = await ordenService.listarTodasOrdenes();
      sendSuccess(res, ordenes);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  buscarOrdenPorId = async (req: Request, res: Response) => {
    try {
      const orden = await ordenService.encontrarOrdenPorId(
        parseInt(req.params.idOrden)
      );

      if (!orden)
        return sendError(
          res,
          `Orden con id ${req.params.idOrden} no encontrada.`,
          404
        );

      sendSuccess(res, orden);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  crearOrden = async (req: Request, res: Response) => {
    try {
      const { body } = req;

      if (
        !body.usuarios_idusuarios ||
        !body.estados_idestado ||
        !body.nombre_completo ||
        !body.direccion ||
        !body.telefono ||
        !body.correo_electronico ||
        !body.fecha_entrega ||
        !body.total_orden ||
        !body.detalles
      )
        return sendError(res, "Datos incompletos para crear la orden.", 400);

      const nuevaOrden = await ordenService.crearOrdenConDetalles(body);

      if (!nuevaOrden) return sendError(res, `No se pudo crear la orden.`, 400);

      sendSuccess(res, nuevaOrden, 201);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  actualizarOrden = async (req: Request, res: Response) => {
    try {
      const {
        body,
        params: { idOrden },
      } = req;

      if (
        !body.usuarios_idusuarios ||
        !body.estados_idestado ||
        !body.nombre_completo
      )
        return sendError(
          res,
          "Datos incompletos para actualizar la orden.",
          400
        );

      const ordenActualizada = await ordenService.actualizarOrden(
        parseInt(idOrden),
        body
      );

      if (!ordenActualizada)
        return sendError(
          res,
          `Orden con id ${req.params.idOrden} no encontrada.`,
          404
        );

      sendSuccess(res, ordenActualizada);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  obtenerDetallesOrden = async (req: Request, res: Response) => {
    try {
      const detalles = await ordenService.obtenerDetallesOrden(
        parseInt(req.params.idOrden)
      );

      if (!detalles)
        return sendError(
          res,
          `Detalles de la orden con id ${req.params.idOrden} no encontrados.`,
          404
        );

      sendSuccess(res, detalles);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  cambiarEstadoOrden = async (req: Request, res: Response) => {
    try {
      const {
        body,
        params: { idOrden },
      } = req;

      if (!body.estado_idestado)
        return sendError(
          res,
          "Datos incompletos para cambiar el estado de la orden.",
          400
        );

      const orden = await ordenService.cambiarEstado(
        parseInt(idOrden),
        body.estado_idestado
      );

      if (!orden)
        return sendError(
          res,
          `Orden con id ${req.params.idOrden} no encontrada.`,
          404
        );

      sendSuccess(res, orden);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };
}

export default new OrdenController();
