import { Request, Response } from "express";
import { RolService } from "../services/RolService";
import { sendError, sendSuccess } from "../utils/asyncHandler";

const rolService = new RolService();

export class RolController {
  async listarRoles(req: Request, res: Response) {
    try {
      const roles = await rolService.listarTodosRoles();
      sendSuccess(res, roles);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const rol = await rolService.encontrarPorId(parseInt(req.params.id));

      if (!rol) {
        sendError(res, `Rol con id ${req.params.id} no encontrado.`, 404);
        return;
      }

      sendSuccess(res, rol);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async crearRol(req: Request, res: Response) {
    try {
      const rol = await rolService.crearNuevoRol(req.body);
      sendSuccess(res, rol, 201);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async actualizarRol(req: Request, res: Response) {
    try {
      await rolService.actualizarRol(parseInt(req.params.id), req.body);
      sendSuccess(res, null, 204);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}
