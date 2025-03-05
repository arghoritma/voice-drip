import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("votes", (table) => {
    table.string("id").primary();
    table.integer("user_id").notNullable().references("id").inTable("users");
    table
      .integer("request_id")
      .notNullable()
      .references("id")
      .inTable("requests");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("votes");
}
