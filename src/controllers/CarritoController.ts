import { Request, Response } from "express";
import carritoService from "../services/CarritoService";
import { sendError, sendSuccess } from "../utils/asyncHandler";

export class CarritoController {
  listarCarritos = async (req: Request, res: Response) => {
    try {
      const carritos = await carritoService.listarTodosCarritos();
      sendSuccess(res, carritos);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  buscarPorId = async (req: Request, res: Response) => {
    try {
      const carrito = await carritoService.encontrarPorId(
        parseInt(req.params.id)
      );

      if (!carrito)
        return sendError(
          res,
          `Carrito con id ${req.params.id} no encontrado.`,
          404
        );

      sendSuccess(res, carrito);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  guardarCarrito = async (req: Request, res: Response) => {
    try {
      const { idUsuario, estado_idestado, detalles } = req.body;

      if (!idUsuario || !estado_idestado || !detalles) {
        return sendError(
          res,
          "Datos incompletos para guardar el carrito.",
          400
        );
      }

      const nuevoCarrito = await carritoService.crearCarritoConDetalles({
        idUsuario,
        estado_idestado,
        detalles,
      });

      sendSuccess(res, nuevoCarrito, 201);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  eliminarCarrito = async (req: Request, res: Response) => {
    try {
      const carrito = await carritoService.eliminarCarrito(
        parseInt(req.params.id)
      );

      if (!carrito)
        return sendError(
          res,
          `Carrito con id ${req.params.id} no encontrado.`,
          404
        );

      sendSuccess(res, "Carrito eliminado exitosamente.");
    } catch (error: any) {
      sendError(res, error.message);
    }
  };
}

export default new CarritoController();
