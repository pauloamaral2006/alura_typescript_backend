import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../enum/EnumPorte";

export default interface InterfacePetRepository {
  criaPet(pet: PetEntity): Promise<void>;
  listaPet(): PetEntity[] | Promise<PetEntity[]>;
  atualizaPet(id: number, pet: PetEntity): void;
  deletaPet(id: number): void;
  buscaPetPeloPorte(porte: EnumPorte): Promise<PetEntity[]> | void;
  buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
    campo: Tipo,
    valor: PetEntity[Tipo]
  ): Promise<PetEntity[]> | PetEntity[];
  adotaPet(idPet: number, idAdotante: number): void;
}
