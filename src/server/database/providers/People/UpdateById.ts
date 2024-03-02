import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPerson } from "../../models";

export const updateById = async (id: number, person: Omit<IPerson, "id">): Promise<void | Error> => {

  try {

    const [{ count }] = await Knex(ETableNames.cities)
      .where("id", "=", person.city_id)
      .count<[{ count: number }]>("* as count");

    if (count === 0) {
      return new Error("A cidade selecionada no cadastro não foi encontrada!");
    }
    
    const result = await Knex(ETableNames.people)
      .where("id", "=", id)
      .update(person);

    if (result > 0) return;

    return new Error("Erro ao tentar atualizar registro!");

  } catch (error) {
    
    console.log(error);
    return new Error("Erro ao tentar atualizar registro!");

  }

};
