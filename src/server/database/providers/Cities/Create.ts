import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICity } from "../../models";

export const create = async (city: Omit<ICity, "id">): Promise<number | Error> => {

  try {
    
    const [result] = await Knex(ETableNames.cities).insert(city).returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao tentar registrar nova cidade!");

  } catch (error) {
    
    console.log(error);
    return new Error("Erro ao tentar registrar nova cidade!");

  }
  
};