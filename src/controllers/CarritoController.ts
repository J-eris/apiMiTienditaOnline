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

  buscarCarritoPorId = async (req: Request, res: Response) => {
    try {
      const carrito = await carritoService.encontrarCarritoPorId(
        parseInt(req.params.idCarrito)
      );

      if (!carrito)
        return sendError(
          res,
          `Carrito con id ${req.params.idCarrito} no encontrado.`,
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

  inactivarCarrito = async (req: Request, res: Response) => {
    try {
      const {
        body,
        params: { idCarrito },
      } = req;

      if (!body.estado_idestado)
        return sendError(
          res,
          "Datos incompletos para inactivar el carrito.",
          400
        );
      const carrito = await carritoService.inactivarCarrito(
        parseInt(idCarrito),
        body
      );

      if (!carrito)
        return sendError(
          res,
          `Carrito con id ${req.params.idCarrito} no encontrado.`,
          404
        );

      sendSuccess(res, carrito);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };
}

export default new CarritoController();
