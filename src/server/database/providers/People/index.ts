import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as create from "./Create";
import * as updateById from "./UpdateById";
import * as deleteById from "./DeleteById";
import * as count from "./Count";

export const peopleProvider = {
  ...create,
  ...getById,
  ...updateById,
  ...deleteById,
  ...getAll,
  ...count
};