import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

const tratarErroValidacaoYup = (
  esquema: yup.Schema<unknown>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    esquema.validate(req.body, {
      abortEarly: false,
    });

    return next();
  } catch (error) {
    const yupErros = error as yup.ValidationError;

    const validationError: Record<string, string> = {};
    yupErros.inner.forEach((error) => {
      if (!error.path) return;

      validationError[error.path] = error.message;
    });
    return res.status(400).json({ error: validationError });
  }
};

export default tratarErroValidacaoYup;
