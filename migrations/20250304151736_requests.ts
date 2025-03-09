import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("requests", (table) => {
    table.string("id").primary();
    table.string("title", 255).notNullable();
    table.text("description");
    table.enum("type", ["feature", "bug", "improvement"]).notNullable();
    table
      .enum("status", [
        "submitted",
        "approved",
        "rejected",
        "in_progress",
        "completed",
      ])
      .notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
    table.integer("user_id").notNullable().references("id").inTable("users");
    table
      .string("platform_id")
      .notNullable()
      .references("id")
      .inTable("platforms");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("requests");
}
