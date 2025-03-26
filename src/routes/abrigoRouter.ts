import express, { RequestHandler } from "express";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidadorBodyEndereco } from "../middleware/validadores/enderecoRequestBody";
import { verificaIdMiddleware } from "../middleware/verificaId";
import AbrigoRepository from "../repositories/AbrigoRepository";
import AbrigoController from "../controller/AbrigoController";
import { middlewareValidadorBodyAbrigo } from "../middleware/validadores/abrigoRequestBody";

const router = express.Router();
const abrigoRepository = new AbrigoRepository(
  AppDataSource.getRepository("AbrigoEntity")
);
const abrigoController = new AbrigoController(abrigoRepository);
const validateAbrigoBody: RequestHandler = (res, req, next) => {
  middlewareValidadorBodyAbrigo(res, req, next);
};
const validateEndereco: RequestHandler = (res, req, next) => {
  middlewareValidadorBodyEndereco(res, req, next);
};
router.post("/", validateAbrigoBody, (res, req) => {
  abrigoController.criaAbrigo(res, req);
});

router.get("/", (res, req) => {
  abrigoController.listaAbrigos(res, req);
});
router.put("/:id", verificaIdMiddleware, (res, req) => {
  abrigoController.atualizaAbrigo(res, req);
});
router.delete("/:id", verificaIdMiddleware, (res, req) => {
  abrigoController.deletaAbrigo(res, req);
});
router.patch("/:id", verificaIdMiddleware, validateEndereco, (res, req) => {
  abrigoController.atualizaEnderecoAbrigo(res, req);
});
export default router;
