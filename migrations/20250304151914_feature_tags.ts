import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("feature_tags", (table) => {
    table
      .integer("feature_id")
      .notNullable()
      .references("id")
      .inTable("features");
    table.integer("tag_id").notNullable().references("id").inTable("tags");
    table.primary(["feature_id", "tag_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("feature_tags");
}
