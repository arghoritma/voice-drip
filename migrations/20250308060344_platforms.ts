import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("platforms", (table) => {
    table.string("id").primary();
    table.string("name", 255);
    table.string("logo", 255);
    table.text("description");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("platforms");
}
