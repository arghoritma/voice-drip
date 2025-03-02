import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("files", (table) => {
    table.string("id").primary();
    table.string("file_name").notNullable();
    table.string("file_url").notNullable();
    table.string("uploaded_by").notNullable().references("id").inTable("users");
    table.timestamp("uploaded_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("files");
}
