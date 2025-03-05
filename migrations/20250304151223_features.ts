import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('features', (table) => {
        table.string('id').primary();
        table.string('title', 255);
        table.text('description');
        table.enum('status', ['planned', 'in_progress', 'completed', 'rejected']);
        table.timestamp('created_at');
        table.timestamp('updated_at');
        table.integer('user_id').references('id').inTable('users');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('features');
}
