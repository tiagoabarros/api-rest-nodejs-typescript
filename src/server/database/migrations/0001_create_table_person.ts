import knex, { Knex } from "knex";

import { ETableNames } from "../ETableNames";

export async function up (knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.people, table => {
      table.bigIncrements("id").primary().index();
      table.string("name").index().notNullable();
      table.string("last_name").index().notNullable();
      table.string("email").unique().notNullable();

      table
        .bigInteger("city_id")
        .index()
        .notNullable()
        .references("id")
        .inTable(ETableNames.cities)
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

      table.comment("Table for storing people records");
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.people}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.people)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.people}`);
    });
}