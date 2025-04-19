import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("post_images", (table) => {
    table.string("id").primary();
    table.string("post_id").notNullable().references("id").inTable("posts");
    table.string("image_url").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("post_images");
}
