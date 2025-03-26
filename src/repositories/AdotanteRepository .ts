import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";
import EnderecoEntity from "../entities/EnderecoEntity";

export default class AdotanteRepository implements InterfaceAdotanteRepository {
  private repository: Repository<AdotanteEntity>;
  constructor(repository: Repository<AdotanteEntity>) {
    this.repository = repository;
  }
  async criaAdotante(Adotante: AdotanteEntity): Promise<void> {
    await this.repository.save(Adotante);
  }
  async listaAdotante(): Promise<AdotanteEntity[]> {
    return await this.repository.find();
  }
  async atualizaAdotante(
    id: number,
    Adotante: AdotanteEntity
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const AdotanteToUpdate = await this.repository.findOne({ where: { id } });

      if (!AdotanteToUpdate) {
        return { success: false, message: "Adotante não encontrado" };
      }

      Object.assign(AdotanteToUpdate, Adotante);

      await this.repository.save(AdotanteToUpdate);

      return { success: true, message: "Registro Atualizado" };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Ocorreu um erro ao tentar atualizar o Adotante.",
      };
    }
  }
  async deletaAdotante(
    id: number
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const AdotanteToRemove = await this.repository.findOne({ where: { id } });

      if (!AdotanteToRemove) {
        return { success: false, message: "Adotante não encontrado" };
      }

      await this.repository.remove(AdotanteToRemove);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: "Ocorreu um erro ao tentar excluir o Adotante.",
      };
    }
  }

  async atualizaEnderecoAdotande(
    idAdotante: number,
    endereco: EnderecoEntity
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const adodante = await this.repository.findOne({
        where: { id: idAdotante },
      });

      if (!adodante) {
        return { success: false, message: "Adotante não encontrado" };
      }

      const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
      adodante.endereco = novoEndereco;

      await this.repository.save(adodante);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: "Ocorreu um erro ao tentar excluir o Adotante.",
      };
    }
  }
}
