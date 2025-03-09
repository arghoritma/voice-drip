import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("changelogs", (table) => {
    table.string("id").primary();
    table.string("version", 255);
    table.text("description");
    table.datetime("release_date");
    table.string("platform_id").references("id").inTable("platforms");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("changelogs");
}
