// adotanteRouter.ts
import express from "express";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository ";
import { AppDataSource } from "../config/dataSource";

const router = express.Router();
const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);
const adotanteController = new AdotanteController(adotanteRepository);

router.post("/", (res, req) => {
  adotanteController.criaAdotante(res, req);
});

router.get("/", (res, req) => {
  adotanteController.listaAdotantes(res, req);
});
router.put("/:id", (res, req) => {
  adotanteController.atualizaAdotante(res, req);
});
router.delete("/:id", (res, req) => {
  adotanteController.deletaAdotante(res, req);
});
router.patch("/:id", (res, req) => {
  adotanteController.atualizaEnderecoAdotante(res, req);
});
export default router;
