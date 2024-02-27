import { Knex } from "knex";
import { ETableNames } from "../EtableNames";

export async function up (knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.cities, table => {
      table.bigIncrements("id").primary().index();
      table.string("name", 150).checkLength("<=", 150).notNullable().index();

      table.comment("Table for storing city records");
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.cities}`);
    });
}

export async function down (knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.cities)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.cities}`);
    });
}