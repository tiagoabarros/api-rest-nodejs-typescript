import knex, { Knex } from "knex";

import { ETableNames } from "../ETableNames";

export async function up (knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.users, table => {
      table.bigIncrements("id").primary().index();
      table.string("name").notNullable().checkLength(">", 3);
      table.string("email").index().unique().notNullable().checkLength(">", 5);
      table.string("password").notNullable().checkLength(">", 6);

      table.comment("Table for storing users records");
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.users}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.users)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.users}`);
    });
}