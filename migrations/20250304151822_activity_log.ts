import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("activity_log", (table) => {
    table.string("id").primary();
    table.integer("user_id").references("id").inTable("users");
    table
      .string("object_type")
      .checkIn(["feature", "bug", "request", "comment"]);
    table.integer("object_id");
    table
      .string("activity_type")
      .checkIn([
        "created",
        "updated",
        "deleted",
        "status_changed",
        "commented",
        "voted",
      ]);
    table.text("description");
    table.timestamp("created_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("activity_log");
}
