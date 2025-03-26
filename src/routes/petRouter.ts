import express, { RequestHandler } from "express";
import PetController from "../controller/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidadorBodyPet } from "../middleware/validadores/petRequestBody";
import { verificaIdMiddleware } from "../middleware/verificaId";

const router = express.Router();

const petRepository = new PetRepository(
  AppDataSource.getRepository("PetEntity"),
  AppDataSource.getRepository("AdotanteEntity")
);

const petController = new PetController(petRepository);
const validateBody: RequestHandler = (res, req, next) => {
  middlewareValidadorBodyPet(res, req, next);
};
router.post("/", validateBody, (res, req) => {
  petController.criaPet(res, req);
});
router.get("/", (res, req) => {
  petController.listaPets(res, req);
});
router.put("/:id", verificaIdMiddleware, (res, req) => {
  petController.atualizaPet(res, req);
});
router.delete("/:id", verificaIdMiddleware, (res, req) => {
  petController.deletaPet(res, req);
});

router.put("/:pet_id/:adotante_id", verificaIdMiddleware, (res, req) => {
  petController.adotaPet(res, req);
});

router.get("/filtroPorte", (res, req) => {
  petController.buscaPetPeloPorte(res, req);
});

router.get("/filtro", (res, req) => {
  petController.buscaPetPorCampoGenerico(res, req);
});
export default router;
