import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("sessions", (table) => {
    table.string("id").primary();
    table.string("user_id").notNullable().references("id").inTable("users");
    table.string("token");
    table.string("otp");
    table.string("device");
    table.string("ip_address");
    table.text("user_agent");
    table.boolean("is_active").defaultTo(true);
    table.datetime("created_at").defaultTo(knex.fn.now());
    table.datetime("last_accessed").defaultTo(knex.fn.now());
    table.datetime("expires_at").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("sessions");
}
