import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import EnderecoEntity from "./EnderecoEntity";
import PetEntity from "./PetEntity";
import { criaSenhaCriptografada } from "../utils/SenhaCriptografada";

@Entity()
export default class AbrigoEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;
  @Column()
  senha: string;
  @Column({ unique: true })
  celular: string;
  @Column({ unique: true })
  email: string;
  @OneToOne(() => EnderecoEntity, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  endereco?: EnderecoEntity;

  @OneToMany(() => PetEntity, (pet) => pet.abrigo)
  pets!: PetEntity[];

  constructor(
    nome: string,
    senha: string,
    celular: string,
    email: string,
    endereco?: EnderecoEntity
  ) {
    this.nome = nome;
    this.senha = senha;
    this.email = email;
    this.celular = celular;
    this.endereco = endereco;
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async criptografaSenha(senha: string) {
    this.senha = criaSenhaCriptografada(this.senha);
  }
}
