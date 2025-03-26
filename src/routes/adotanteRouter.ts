import express, { RequestHandler } from "express";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository ";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidadorBodyAdotante } from "../middleware/validadores/adotanteRequestBody";
import { middlewareValidadorBodyEndereco } from "../middleware/validadores/enderecoRequestBody";
import { verificaIdMiddleware } from "../middleware/verificaId";

const router = express.Router();
const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);
const adotanteController = new AdotanteController(adotanteRepository);
const validateEndereco: RequestHandler = (res, req, next) => {
  middlewareValidadorBodyEndereco(res, req, next);
};
const validateBody: RequestHandler = (res, req, next) => {
  middlewareValidadorBodyAdotante(res, req, next);
};
router.post("/", validateBody, (res, req) => {
  adotanteController.criaAdotante(res, req);
});

router.get("/", (res, req) => {
  adotanteController.listaAdotantes(res, req);
});
router.put("/:id", verificaIdMiddleware, (res, req) => {
  adotanteController.atualizaAdotante(res, req);
});
router.delete("/:id", verificaIdMiddleware, (res, req) => {
  adotanteController.deletaAdotante(res, req);
});
router.patch("/:id", verificaIdMiddleware, validateEndereco, (res, req) => {
  adotanteController.atualizaEnderecoAdotante(res, req);
});
export default router;
