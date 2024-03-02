import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const count = async (filter = ""): Promise<number | Error> => {

  try {
    
    const [{count}] = await Knex(ETableNames.people)
      .where("name", "like", `%${filter}%`)
      .orWhere("last_name", "like", `%${filter}%`)
      .count<[{count: number}]>("* as count");

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error("Erro ao consultar quantidade total de resgistros!");

  } catch (error) {
    
    console.log(error);
    return new Error("Erro ao consultar quantidade total de resgistros!");

  }

};