import * as create from "./Create";
import * as getByEMail from "./GetByEmail";

export const usersProvider = {
  ...create,
  ...getByEMail
}