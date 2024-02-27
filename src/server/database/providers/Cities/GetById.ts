import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICity } from "../../models";

export const getById = async (id: number): Promise<ICity | Error> => {

  try {
    
    const result = await Knex(ETableNames.cities).select().where("id", "=", id).first();

    if (result) return result;

    return new Error("Erro ao tentar buscar registro de cidade!");

  } catch (error) {
    
    console.log(error);
    return new Error("Erro ao tentar buscar registro de cidade!");

  }
  
};