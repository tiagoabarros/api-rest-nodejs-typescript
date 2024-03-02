import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPerson } from "../../models";

export const create = async (person: Omit<IPerson, "id">): Promise<number | Error> => {

  try {

    const [{ count }] = await Knex(ETableNames.cities)
      .where("id", "=", person.city_id)
      .count<[{ count: number }]>("* as count");

    if (count === 0) {
      return new Error("A cidade selecionada no cadastro não foi encontrada!");
    } 
    
    const [result] = await Knex(ETableNames.people)
      .insert(person)
      .returning("id");
    
    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao tentar realizar novo registro!");

  } catch (error) {
    
    console.log(error);
    return new Error("Erro ao tentar realizar novo registro!");

  }

};