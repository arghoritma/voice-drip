import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("request_tags", (table) => {
    table
      .integer("request_id")
      .notNullable()
      .references("id")
      .inTable("requests");
    table.integer("tag_id").notNullable().references("id").inTable("tags");
    table.primary(["request_id", "tag_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("request_tags");
}
