import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICity } from "../../models";

export const updateById = async (id: number, city: Omit<ICity, "id">): Promise<void | Error> => {

  try {

    const result = await Knex(ETableNames.cities).where("id", "=", id).update(city);

    if (result > 0) return;

    return new Error("Erro ao tentar atualizar registro de cidade!");

  } catch (error) {
    
    console.log(error);
    return new Error("Erro ao tentar atualizar registro de cidade!");

  }
  
};