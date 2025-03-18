import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("roadmaps", (table) => {
    table.string("id").primary();
    table.string("title", 255);
    table.text("description");
    table.dateTime("start_date");
    table.dateTime("end_date");
    table.string("platform_id").references("id").inTable("platforms");
    table.enum("status", [
      "planned",
      "in_progress",
      "completed",
      "cancelled",
      "on_hold",
    ]);
    table.timestamp("created_at");
    table.timestamp("updated_at");
    table.string("user_id").references("id").inTable("users");
    table.string("request_id").references("id").inTable("requests");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("roadmaps");
}
