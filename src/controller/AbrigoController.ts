import { Request, Response } from "express";
import AbrigoEntity from "../entities/AbrigoEntity";
import AbrigoRepository from "../repositories/AbrigoRepository";
import EnderecoEntity from "../entities/EnderecoEntity";
import {
  TipoRequestBodyAbrigo,
  TipoRequestParamsAbrigo,
  TipoResponseBodyAbrigo,
} from "../tipos/tiposAbrigo";
import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";

export default class AbrigoController {
  constructor(private repository: AbrigoRepository) {}

  async criaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { nome, celular, endereco, email, senha } = <AbrigoEntity>req.body;
    const novoAbrigo = new AbrigoEntity(nome, senha, celular, email, endereco);

    await this.repository.criaAbrigo(novoAbrigo);
    return res
      .status(201)
      .json({ dados: { id: novoAbrigo.id, nome, celular, email, endereco } });
  }

  async listaAbrigos(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const listaDeAbrigos = await this.repository.listaAbrigo();
    const dados = listaDeAbrigos.map((Abrigo) => {
      return {
        id: Abrigo.id,
        nome: Abrigo.nome,
        celular: Abrigo.celular,
        email: Abrigo.email,
        endereco: Abrigo.endereco !== null ? Abrigo.endereco : undefined,
      };
    });
    return res.status(EnumHttpStatusCode.OK).json({ dados });
  }

  async atualizaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaAbrigo(
      Number(id),
      req.body as AbrigoEntity
    );

    return res.sendStatus(EnumHttpStatusCode.OK);
  }

  async deletaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaAbrigo(Number(id));

    return res.sendStatus(EnumHttpStatusCode.OK);
  }

  async atualizaEnderecoAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, EnderecoEntity>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { id } = req.params;

    const { success, message } = await this.repository.atualizaEnderecoAbrigo(
      Number(id),
      req.body
    );

    return res.sendStatus(EnumHttpStatusCode.OK);
  }
}
