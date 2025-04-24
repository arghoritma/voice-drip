import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("activity_log", (table) => {
    table.string("object_id").alter();
    table.string("user_id").alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("activity_log", (table) => {
    table.integer("object_id").alter();
    table.integer("user_id").alter();
  });
}
