// InterfaceAdotanteRepository.ts
import AdotanteEntity from "../../entities/AdotanteEntity";
import EnderecoEntity from "../../entities/EnderecoEntity";

export default interface InterfaceAdotanteRepository {
  criaAdotante(adotante: AdotanteEntity): void | Promise<void>;
  listaAdotante(): AdotanteEntity[] | Promise<AdotanteEntity[]>;
  atualizaAdotante(
    id: number,
    Adotante: AdotanteEntity
  ): Promise<{ success: boolean; message?: string }> | void;
  deletaAdotante(
    id: number
  ): Promise<{ success: boolean; message?: string }> | void;
  atualizaEnderecoAdotande(
    idAdotante: number,
    endereco: EnderecoEntity
  ): Promise<{ success: boolean; message?: string }> | void;
}
