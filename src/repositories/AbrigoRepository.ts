import { Repository } from "typeorm";
import AbrigoEntity from "../entities/AbrigoEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulaErros";
import InterfaceAbrigoRepository from "./interfaces/InterfaceAbrigoRepository";

export default class AbrigoRepository implements InterfaceAbrigoRepository {
  private repository: Repository<AbrigoEntity>;
  constructor(repository: Repository<AbrigoEntity>) {
    this.repository = repository;
  }

  private async verificaCelularAbrigo(celular: string) {
    return await this.repository.find({ where: { celular } });
  }

  private async verificaEmail(email: string) {
    return await this.repository.find({ where: { email } });
  }
  async criaAbrigo(abrigo: AbrigoEntity): Promise<void> {
    if (
      (await this.verificaCelularAbrigo(abrigo.celular)) ||
      (await this.verificaEmail(abrigo.email))
    ) {
      throw new RequisicaoRuim("Celular ou E-mail já cadastrado");
    }

    await this.repository.save(abrigo);
  }
  async listaAbrigo(): Promise<AbrigoEntity[]> {
    return await this.repository.find();
  }
  async atualizaAbrigo(id: number, abrigo: AbrigoEntity) {
    const abrigoToUpdate = await this.repository.findOne({ where: { id } });

    if (!abrigoToUpdate) {
      throw new NaoEncontrado("Abrigo não encontrado");
    }

    Object.assign(abrigoToUpdate, abrigo);

    await this.repository.save(abrigoToUpdate);

    return { success: true, message: "Registro Atualizado" };
  }
  async deletaAbrigo(id: number) {
    const abrigoToRemove = await this.repository.findOne({ where: { id } });

    if (!abrigoToRemove) {
      throw new NaoEncontrado("Abrigo não encontrado");
    }

    await this.repository.remove(abrigoToRemove);

    return { success: true, message: undefined };
  }

  async atualizaEnderecoAbrigo(
    idAbrigo: number,
    endereco: EnderecoEntity
  ): Promise<{ success: boolean; message?: string }> {
    const adodante = await this.repository.findOne({
      where: { id: idAbrigo },
    });

    if (!adodante) {
      throw new NaoEncontrado("Abrigo não encontrado");
    }

    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
    adodante.endereco = novoEndereco;

    await this.repository.save(adodante);
    return { success: true };
  }
}
