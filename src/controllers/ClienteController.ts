import { Request, Response } from "express";
import { ClienteService } from "../services/ClienteService";
import { sendError, sendSuccess } from "../utils/asyncHandler";

const clienteService = new ClienteService();

export class ClienteController {
  async listarClientes(req: Request, res: Response) {
    try {
      const clientes = await clienteService.listarTodosClientes();
      sendSuccess(res, clientes);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const cliente = await clienteService.encontrarPorId(
        parseInt(req.params.id)
      );

      if (!cliente) {
        sendError(res, `Cliente con id ${req.params.id} no encontrado.`, 404);
        return;
      }

      sendSuccess(res, cliente);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async crearCliente(req: Request, res: Response) {
    try {
      const cliente = await clienteService.crearNuevoCliente(req.body);
      sendSuccess(res, cliente, 201);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async actualizarCliente(req: Request, res: Response) {
    try {
      const clienteActualizado = await clienteService.actualizarCliente(
        parseInt(req.params.id),
        req.body
      );

      sendSuccess(res, clienteActualizado);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async cambiarEstadoCliente(req: Request, res: Response) {
    try {
      const cliente = await clienteService.cambiarEstadoCliente(
        parseInt(req.params.id),
        req.body
      );

      if (!cliente) {
        sendError(res, `Cliente con id ${req.params.id} no encontrado.`, 404);
        return;
      }

      sendSuccess(res, cliente);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}
