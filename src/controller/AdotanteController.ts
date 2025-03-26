import { Request, Response } from "express";
import AdotanteEntity from "../entities/AdotanteEntity";
import AdotanteRepository from "../repositories/AdotanteRepository ";
import EnderecoEntity from "../entities/EnderecoEntity";
import {
  TipoRequestBodyAdotante,
  TipoRequestParamsAdotante,
  TipoResponseBodyAdotante,
} from "../tipos/tiposAdotante";

export default class AdotanteController {
  constructor(private repository: AdotanteRepository) {}

  async criaAdotante(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const { nome, celular, endereco, foto, senha } = <AdotanteEntity>req.body;

    let bodyValidated: TipoRequestBodyAdotante;

    const novoAdotante = new AdotanteEntity(
      nome,
      senha,
      celular,
      foto,
      endereco
    );

    await this.repository.criaAdotante(novoAdotante);
    return res
      .status(201)
      .json({ dados: { id: novoAdotante.id, nome, celular, endereco } });
  }

  async listaAdotantes(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const listaDeAdotantes = await this.repository.listaAdotante();
    const dados = listaDeAdotantes.map((adotante) => {
      return {
        id: adotante.id,
        nome: adotante.nome,
        celular: adotante.celular,
        endereco: adotante.endereco !== null ? adotante.endereco : undefined,
      };
    });
    return res.status(200).json({ dados });
  }

  async atualizaAdotante(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaAdotante(
      Number(id),
      req.body as AdotanteEntity
    );

    return res.sendStatus(204);
  }

  async deletaAdotante(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaAdotante(
      Number(id)
    );

    return res.sendStatus(204);
  }

  async atualizaEnderecoAdotante(
    req: Request<TipoRequestParamsAdotante, {}, EnderecoEntity>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const { id } = req.params;

    const { success, message } = await this.repository.atualizaEnderecoAdotande(
      Number(id),
      req.body
    );

    return res.sendStatus(204);
  }
}
