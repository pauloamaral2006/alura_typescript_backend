import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/EnumEspecie";
import AdotanteEntity from "./AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";

@Entity()
export default class PetEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;
  @Column()
  especie: EnumEspecie;
  @Column({ nullable: true })
  porte?: EnumPorte;
  @Column()
  adotado: boolean;
  @Column()
  dataDeNascimento: Date;

  @ManyToOne(() => AdotanteEntity, (adotante) => adotante.pets)
  adotante!: AdotanteEntity;

  constructor(
    nome: string,
    especie: EnumEspecie,
    adotado: boolean,
    dataDeNascimento: Date,
    porte?: EnumPorte
  ) {
    this.nome = nome;
    this.especie = especie;
    this.adotado = adotado;
    this.dataDeNascimento = dataDeNascimento;
    this.porte = porte;
  }
}
