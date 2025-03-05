import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('bug_reports', (table) => {
        table.string('id').primary();
        table.string('title', 255).notNullable();
        table.text('description');
        table.enum('status', ['open', 'in_progress', 'resolved', 'closed']).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at');
        table.integer('user_id').unsigned().references('id').inTable('users');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('bug_reports');
}
