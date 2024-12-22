import { Request, Response } from "express";
import productoService from "../services/ProductoService";
import { sendError, sendSuccess } from "../utils/asyncHandler";

export class ProductoController {
  listarProductos = async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 10 } = req.query;

      const productos = await productoService.listarTodosProductos(
        Number(page),
        Number(limit)
      );
      sendSuccess(res, productos);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  buscarProductoPorId = async (req: Request, res: Response) => {
    try {
      const producto = await productoService.encontrarProductoPorId(
        parseInt(req.params.idProducto)
      );

      if (!producto)
        return sendError(
          res,
          `Producto con id ${req.params.idProducto} no encontrado.`,
          404
        );

      sendSuccess(res, producto);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  buscarImagenPorId = async (req: Request, res: Response) => {
    try {
      const imagen = await productoService.encontrarImagenPorId(
        parseInt(req.params.idImagen)
      );

      if (!imagen)
        return sendError(
          res,
          `Imagen con id ${req.params.idImagen} no encontrada.`,
          404
        );

      sendSuccess(res, imagen);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  crearProducto = async (req: Request, res: Response) => {
    try {
      const { body } = req;

      if (!body.nombre || !body.codigo)
        return sendError(res, "Datos incompletos para crear el producto.", 400);

      const nuevoProducto = await productoService.crearProductoConImagenes(
        body
      );

      if (!nuevoProducto) return sendError(res, `Producto ya existe.`, 400);

      sendSuccess(res, nuevoProducto, 201);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  actualizarProducto = async (req: Request, res: Response) => {
    const {
      body,
      params: { idProducto },
    } = req;

    if (!body.codigo)
      return sendError(
        res,
        "Datos incompletos para actualizar el producto.",
        400
      );

    try {
      const productoActualizado = await productoService.actualizarProducto(
        parseInt(idProducto),
        body
      );

      if (!productoActualizado)
        return sendError(
          res,
          `Producto con id ${req.params.idProducto} no encontrado.`,
          404
        );

      sendSuccess(res, productoActualizado);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  actualizarImagenProducto = async (req: Request, res: Response) => {
    const {
      body,
      params: { idImagen },
    } = req;

    if (!body.ruta_imagen)
      return sendError(res, "Ruta de imagen requerida.", 400);

    try {
      const imagenActualizada = await productoService.actualizarProductoImagen(
        parseInt(idImagen),
        body
      );

      if (!imagenActualizada)
        return sendError(
          res,
          `Imagen con id ${req.params.idImagen} no encontrada.`,
          404
        );

      sendSuccess(res, imagenActualizada);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  cambiarEstadoProducto = async (req: Request, res: Response) => {
    try {
      const {
        body,
        params: { idProducto },
      } = req;

      if (!body.estado_idestado)
        return sendError(res, "Estado no especificado.", 400);

      const producto = await productoService.cambiarEstadoProducto(
        parseInt(idProducto),
        body.estado_idestado
      );

      if (!producto)
        return sendError(
          res,
          `Producto con id ${req.params.idProducto} no encontrado.`,
          404
        );

      sendSuccess(res, producto);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  actualizarStockProducto = async (req: Request, res: Response) => {
    try {
      const {
        body,
        params: { idProducto },
      } = req;

      if (!body.cantidad)
        return sendError(
          res,
          "Datos incompletos para actualizar el stock.",
          400
        );

      const producto = await productoService.actualizarStockProducto(
        parseInt(idProducto),
        body.cantidad,
        body.incremento
      );

      if (!producto)
        return sendError(
          res,
          `Producto con id ${req.params.idProducto} no encontrado.`,
          404
        );

      sendSuccess(res, producto);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  obtenerDetallesProducto = async (req: Request, res: Response) => {
    try {
      const producto = await productoService.obtenerDetallesProducto(
        parseInt(req.params.idProducto)
      );

      if (!producto)
        return sendError(
          res,
          `Producto con id ${req.params.idProducto} no encontrado.`,
          404
        );

      sendSuccess(res, producto);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  obtenerProductosPorCategoria = async (req: Request, res: Response) => {
    try {
      const productos = await productoService.obtenerProductosPorCategoria(
        parseInt(req.params.idCategoria)
      );

      sendSuccess(res, productos);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };

  eliminarImagenProducto = async (req: Request, res: Response) => {
    try {
      const imagen = await productoService.eliminarImagenProducto(
        parseInt(req.params.idImagen)
      );

      if (!imagen)
        return sendError(
          res,
          `Imagen con id ${req.params.idImagen} no encontrada.`,
          404
        );

      sendSuccess(res, imagen);
    } catch (error: any) {
      sendError(res, error.message);
    }
  };
}

export default new ProductoController();
