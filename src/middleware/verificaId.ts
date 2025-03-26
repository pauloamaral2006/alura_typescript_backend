import { NextFunction, Request, Response } from "express";
import { RequisicaoRuim } from "../utils/manipulaErros";

export const verificaIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const paramns = { ...req.params };

  for (const param in paramns) {
    if (!Number.isInteger(Number(paramns[param]))) {
      throw new RequisicaoRuim(
        `O parametro ${param} deve ser um número inteiro.`
      );
    }
  }
  return next();
};
