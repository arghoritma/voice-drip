import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("comment_images", (table) => {
    table.string("id").primary();
    table
      .string("comment_id")
      .notNullable()
      .references("id")
      .inTable("comments");
    table.string("image_url").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("comment_images");
}
