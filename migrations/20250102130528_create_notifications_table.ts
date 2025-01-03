import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("notifications", (table) => {
        table.string("id").primary();
        table.string("user_id").notNullable().references("id").inTable("users");
        table.string("title").notNullable();
        table.text("message");
        table.boolean("is_read").defaultTo(false);
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("notifications");
}
