import { ETableNames } from "../../ETableNames";
import { IUser } from "../../models";
import { Knex } from "../../knex";

export const getByEmail = async (email: string): Promise<IUser | Error> => {

  try {
    
    const result = await Knex(ETableNames.users)
      .select("*")
      .where("email", "=", email)
      .first();

    if (result) return result;

    return new Error("Registro não encontrado!");

  } catch (error) {
    
    console.log(error);
    return new Error("Erro ao tentar consultar registro!");

  }

}