import * as create from "./Create";
import * as deleteById from "./DeleteById";
import * as updateById from "./UpdateById";
import * as getById from "./GetById";
import * as getAll from "./GetAll";

export const PeopleController = {
  ...create,
  ...deleteById,
  ...updateById,
  ...getById,
  ...getAll
};