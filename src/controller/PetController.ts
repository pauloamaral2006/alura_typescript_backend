import { Request, Response } from "express";
import TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";

let listaDePets: TipoPet[] = [];

let id: number = 0;
function geraId(): number {
  id = id + 1;
  return id;
}

export default class PetController {
  constructor(private repository: PetRepository) {}
  async criaPet(req: Request, res: Response) {
    const { adotado, especie, porte, dataDeNascimento, nome } =
      req.body as PetEntity;

    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ erro: "Espécie Inválida" });
    }

    if (porte && !(porte in EnumPorte)) {
      return res.status(400).json({ erro: "Porte Inválido" });
    }

    const novoPet = new PetEntity(
      nome,
      especie,
      adotado,
      dataDeNascimento,
      porte
    );
    await this.repository.criaPet(novoPet);

    return res.status(201).json(novoPet);
  }

  async listaPets(req: Request, res: Response) {
    const listaDepets = await this.repository.listaPet();

    return res.status(200).json(listaDepets);
  }

  async atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async deletaPet(req: Request, res: Response) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaPet(Number(id));

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async adotaPet(req: Request, res: Response) {
    const { pet_id, adotante_id } = req.params;

    const { success, message } = await this.repository.adotaPet(
      Number(pet_id),
      Number(adotante_id)
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async buscaPetPeloPorte(req: Request, res: Response) {
    const { porte } = req.query;

    const listaDepets = await this.repository.buscaPetPeloPorte(
      porte as EnumPorte
    );

    return res.status(200).json(listaDepets);
  }

  async buscaPetPorCampoGenerico(req: Request, res: Response) {
    const { campo, valor } = req.query;

    const listaDepets = await this.repository.buscaPetPorCampoGenerico(
      campo as keyof PetEntity,
      valor as string
    );

    return res.status(200).json(listaDepets);
  }
}
