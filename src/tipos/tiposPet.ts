import PetEntity from "../entities/PetEntity";

type TipoRequestBodyPet = Omit<PetEntity, "id" | "abrigo">;

type TipoRequestParamsPet = {
  id?: string;
  pet_id?: string;
  adotante_id?: string;
};

type TipoResponseBodyPet = {
  dados?:
    | Pick<PetEntity, "id" | "nome" | "especie" | "porte">
    | Pick<PetEntity, "id" | "nome" | "especie" | "porte">[];
};

export { TipoRequestBodyPet, TipoRequestParamsPet, TipoResponseBodyPet };
