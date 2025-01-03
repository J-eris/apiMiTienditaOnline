import multer, { FileFilterCallback } from "multer";
import path from "path";
import crypto from "crypto";
import { NextFunction, Request, Response } from "express";

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/uploads"),
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    const uuid = crypto.randomUUID();
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}_${uuid}${ext}`);
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  return cb(
    new Error("Solo se permiten archivos de imagen (jpeg, jpg, png, gif).")
  );
};

const maxSize = 5 * 1024 * 1024;

export const upload = (req: Request, res: Response, next: NextFunction) => {
  const uploadHandler = multer({
    storage,
    fileFilter,
    limits: { fileSize: maxSize },
  }).array("imagenes", 10);

  uploadHandler(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          message: "Se excedió el número máximo de archivos permitidos (10).",
        });
      }
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "Solo se permiten archivos de hasta 5 MB de tamaño.",
        });
      }
      return res.status(400).json({
        message: err.message,
      });
    } else if (err) {
      return res.status(400).json({
        message: err.message,
      });
    }

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({
        message: "No se ha seleccionado ningún archivo compatible.",
      });
    }

    next();
  });
};
