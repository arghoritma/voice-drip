import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.string("id").primary();
    table.string("email").unique().notNullable();
    table.string("username").notNullable();
    table.string("phone_number");
    table.string("password").notNullable();
    table.string("role");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });

  await knex.schema.createTable("teams", (table) => {
    table.string("id").primary();
    table.string("name").notNullable();
    table.text("description");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });

  await knex.schema.createTable("team_members", (table) => {
    table.string("id").primary();
    table.string("user_id").notNullable().references("id").inTable("users");
    table.string("team_id").notNullable().references("id").inTable("teams");
    table.timestamp("joined_at").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("projects", (table) => {
    table.string("id").primary();
    table.string("team_id").notNullable().references("id").inTable("teams");
    table.string("name").notNullable();
    table.text("description");
    table.timestamp("deadline");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });

  await knex.schema.createTable("tasks", (table) => {
    table.string("id").primary();
    table
      .string("project_id")
      .notNullable()
      .references("id")
      .inTable("projects");
    table.string("title").notNullable();
    table.text("description");
    table.string("assigned_to").references("id").inTable("users");
    table.string("status").defaultTo("To-Do");
    table.string("priority");
    table.date("due_date");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });

  await knex.schema.createTable("files", (table) => {
    table.string("id").primary();
    table.string("task_id").notNullable().references("id").inTable("tasks");
    table.string("file_name").notNullable();
    table.string("file_url").notNullable();
    table.string("uploaded_by").notNullable().references("id").inTable("users");
    table.timestamp("uploaded_at").defaultTo(knex.fn.now());
  });

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
  await knex.schema.dropTable("files");
  await knex.schema.dropTable("tasks");
  await knex.schema.dropTable("projects");
  await knex.schema.dropTable("team_members");
  await knex.schema.dropTable("teams");
  await knex.schema.dropTable("users");
  await knex.schema.dropTable("notifications");
}
