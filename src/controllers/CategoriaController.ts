import { Request, Response } from "express";
import categoriaService from "../services/CategoriaService";
import { sendError, sendSuccess } from "../utils/asyncHandler";

export class CategoriaController {
  listarCategorias = async (req: Request, res: Response) => {
    try {
      const categorias = await categoriaService.listarTodasCategorias();
      sendSuccess(res, categorias);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  buscarCategoriaPorId = async (req: Request, res: Response) => {
    try {
      const categoria = await categoriaService.encontrarCategoriaPorId(
        parseInt(req.params.id)
      );

      if (!categoria)
        return sendError(
          res,
          `Categoría con id ${req.params.id} no encontrado.`,
          404
        );

      sendSuccess(res, categoria);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  crearCategoria = async (req: Request, res: Response) => {
    try {
      const { body } = req;

      if (!body.nombre)
        return sendError(res, "Nombre de categoría no especificado.", 400);

      const nuevaCategoria = await categoriaService.crearNuevaCategoria(body);

      if (!nuevaCategoria) return sendError(res, `Categoría ya existe.`, 400);

      sendSuccess(res, nuevaCategoria, 201);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  actualizarCategoria = async (req: Request, res: Response) => {
    try {
      const {
        body,
        params: { id },
      } = req;

      if (!body.nombre)
        return sendError(res, "Nombre de categoría no especificado.", 400);

      const categoriaActualizada = await categoriaService.actualizarCategoria(
        parseInt(id),
        body
      );

      if (!categoriaActualizada)
        return sendError(
          res,
          `Categoría con id ${req.params.id} no encontrado.`,
          404
        );

      sendSuccess(res, categoriaActualizada);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  cambiarEstadoCategoria = async (req: Request, res: Response) => {
    try {
      const categoria = await categoriaService.cambiarEstado(
        parseInt(req.params.id),
        req.body.estado_idestado
      );

      if (!categoria)
        return sendError(
          res,
          `Categoría con id ${req.params.id} no encontrado.`,
          404
        );

      sendSuccess(res, categoria);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };
}

export default new CategoriaController();