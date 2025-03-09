import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.string("id").primary();
    table.string("email").unique().notNullable();
    table.string("name").notNullable();
    table.string("phone");
    table.string("password_has");
    table.string("avatar");
    table.datetime("created_at");
    table.datetime("updated_at");
    table.string("role").defaultTo("user");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
