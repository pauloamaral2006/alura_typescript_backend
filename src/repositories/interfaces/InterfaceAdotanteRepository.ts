// InterfaceAdotanteRepository.ts
import AdotanteEntity from "../../entities/AdotanteEntity";
import EnderecoEntity from "../../entities/EnderecoEntity";

export default interface InterfaceAdotanteRepository {
  criaAdotante(adotante: AdotanteEntity): void | Promise<void>;
  listaAdotante(): AdotanteEntity[] | Promise<AdotanteEntity[]>;
  atualizaAdotante(id: number, Adotante: AdotanteEntity): void;
  deletaAdotante(id: number): void;
  atualizaEnderecoAdotande(idAdotante: number, endereco: EnderecoEntity): void;
}
