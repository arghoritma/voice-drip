import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("bug_tags", (table) => {
    table
      .integer("bug_id")
      .notNullable()
      .references("id")
      .inTable("bug_reports");
    table.integer("tag_id").notNullable().references("id").inTable("tags");
    table.primary(["bug_id", "tag_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("bug_tags");
}
