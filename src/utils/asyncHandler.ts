import { Request, Response } from "express";

const sendSuccess = (res: Response, data: any, statusCode: number = 200) => {
  res.status(statusCode).json({
    success: true,
    data: data,
    error: null,
  });
};

const sendError = (
  res: Response,
  message: string = "Error en el servidor.",
  statusCode: number = 500
) => {
  res.status(statusCode).json({
    success: false,
    data: null,
    error: {
      message: message,
    },
  });
};

export { sendSuccess, sendError };
