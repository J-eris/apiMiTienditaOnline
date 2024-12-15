export class AppError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Recurso no encontrado") {
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = "Error de validación") {
    super(message, 400);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Error de autenticación") {
    super(message, 401);
  }
}
