import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";
import EnderecoEntity from "../entities/EnderecoEntity";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulaErros";

export default class AdotanteRepository implements InterfaceAdotanteRepository {
  private repository: Repository<AdotanteEntity>;
  constructor(repository: Repository<AdotanteEntity>) {
    this.repository = repository;
  }

  private async verificaCelularAdotante(celular: string) {
    return await this.repository.find({ where: { celular } });
  }
  async criaAdotante(adotante: AdotanteEntity): Promise<void> {
    if (await this.verificaCelularAdotante(adotante.celular)) {
      throw new RequisicaoRuim("Celular já cadastrado");
    }
    await this.repository.save(adotante);
  }
  async listaAdotante(): Promise<AdotanteEntity[]> {
    return await this.repository.find();
  }
  async atualizaAdotante(id: number, adotante: AdotanteEntity) {
    const adotanteToUpdate = await this.repository.findOne({ where: { id } });

    if (!adotanteToUpdate) {
      throw new NaoEncontrado("Adotante não encontrado");
    }

    Object.assign(adotanteToUpdate, adotante);

    await this.repository.save(adotanteToUpdate);

    return { success: true, message: "Registro Atualizado" };
  }
  async deletaAdotante(id: number) {
    const adotanteToRemove = await this.repository.findOne({ where: { id } });

    if (!adotanteToRemove) {
      throw new NaoEncontrado("Adotante não encontrado");
    }

    await this.repository.remove(adotanteToRemove);

    return { success: true, message: undefined };
  }

  async atualizaEnderecoAdotande(
    idAdotante: number,
    endereco: EnderecoEntity
  ): Promise<{ success: boolean; message?: string }> {
    const adodante = await this.repository.findOne({
      where: { id: idAdotante },
    });

    if (!adodante) {
      throw new NaoEncontrado("Adotante não encontrado");
    }

    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
    adodante.endereco = novoEndereco;

    await this.repository.save(adodante);
    return { success: true };
  }
}
