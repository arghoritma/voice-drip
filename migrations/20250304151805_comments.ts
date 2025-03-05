import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("comments", (table) => {
    table.string("id").primary();
    table.integer("user_id").notNullable().references("id").inTable("users");
    table
      .integer("request_id")
      .notNullable()
      .references("id")
      .inTable("requests");
    table.text("content");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("comments");
}
