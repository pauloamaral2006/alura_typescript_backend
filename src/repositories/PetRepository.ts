import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";
import { NaoEncontrado } from "../utils/manipulaErros";

export default class PetRepository implements InterfacePetRepository {
  private petRepository: Repository<PetEntity>;
  private adotanteReposiory: Repository<AdotanteEntity>;
  constructor(
    petRepository: Repository<PetEntity>,
    adotanteReposiory: Repository<AdotanteEntity>
  ) {
    this.petRepository = petRepository;
    this.adotanteReposiory = adotanteReposiory;
  }
  async criaPet(pet: PetEntity): Promise<void> {
    await this.petRepository.save(pet);
  }
  async listaPet(): Promise<PetEntity[]> {
    return await this.petRepository.find();
  }
  async atualizaPet(id: number, pet: PetEntity) {
    const petToUpdate = await this.petRepository.findOne({ where: { id } });

    if (!petToUpdate) {
      throw new NaoEncontrado("Pet não encontrado");
    }

    Object.assign(petToUpdate, pet);

    await this.petRepository.save(petToUpdate);

    return { success: true, message: "Registro Atualizado" };
  }
  async deletaPet(id: number) {
    const petToRemove = await this.petRepository.findOne({ where: { id } });

    if (!petToRemove) {
      throw new NaoEncontrado("Pet não encontrado");
    }

    await this.petRepository.remove(petToRemove);

    return { success: true, message: undefined };
  }

  async adotaPet(
    idPet: number,
    idAdotante: number
  ): Promise<{ success: boolean; message?: string }> {
    const pet = await this.petRepository.findOne({ where: { id: idPet } });

    if (!pet) {
      throw new NaoEncontrado("Pet não encontrado");
    }

    const adotante = await this.adotanteReposiory.findOne({
      where: { id: idAdotante },
    });

    if (!adotante) {
      throw new NaoEncontrado("Adotante não encontrado");
    }

    pet.adotante = adotante;
    pet.adotado = true;

    await this.petRepository.save(pet);

    return { success: true, message: "Pet Adotado" };
  }
  async buscaPetPeloPorte(porte: EnumPorte): Promise<PetEntity[]> {
    const pets = await this.petRepository.find({ where: { porte } });
    return pets;
  }
  async buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
    campo: Tipo,
    valor: PetEntity[Tipo]
  ): Promise<PetEntity[]> {
    const pets = await this.petRepository.find({ where: { [campo]: valor } });
    return pets;
  }
}
