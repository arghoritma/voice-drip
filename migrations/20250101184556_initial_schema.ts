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

  await knex.schema.createTable("comments", (table) => {
    table.string("id").primary();
    table.string("task_id").notNullable().references("id").inTable("tasks");
    table.string("user_id").notNullable().references("id").inTable("users");
    table.text("content");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("files", (table) => {
    table.string("id").primary();
    table.string("task_id").notNullable().references("id").inTable("tasks");
    table.string("file_name").notNullable();
    table.string("file_url").notNullable();
    table.string("uploaded_by").notNullable().references("id").inTable("users");
    table.timestamp("uploaded_at").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("categories", (table) => {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("color").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.string("user_id").notNullable().references("id").inTable("users");
  });

  await knex.schema.createTable("todo_recurrences", (table) => {
    table.string("id").primary();
    table.string("main_todo_id").notNullable();
    table.string("pattern").notNullable();
    table.date("next_date").notNullable();
    table.date("original_date").notNullable();
    table.boolean("is_active").defaultTo(true);
    table.string("user_id").notNullable().references("id").inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.date("last_completed_date");
  });

  await knex.schema.createTable("todos", (table) => {
    table.string("id").primary();
    table.string("title").notNullable();
    table.text("description");
    table.string("category").references("id").inTable("categories");
    table.date("date").notNullable();
    table.string("status").defaultTo("pending");
    table.boolean("is_recurring").defaultTo(false);
    table.string("repeat");
    table.date("original_date");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("completed_at");
    table.string("user_id").notNullable().references("id").inTable("users");
    table.string("main_todo_id").references("id").inTable("todos");
    table.string("recurrence_id").references("id").inTable("todo_recurrences");
  });

  await knex.schema.createTable("divisions", (table) => {
    table.string("id").primary();
    table.string("name").notNullable();
    table.text("description");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("user_divisions", (table) => {
    table.string("id").primary();
    table.string("user_id").notNullable().references("id").inTable("users");
    table
      .integer("division_id")
      .notNullable()
      .references("id")
      .inTable("divisions");
    table.timestamp("assigned_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("user_divisions");
  await knex.schema.dropTable("divisions");
  await knex.schema.dropTable("todos");
  await knex.schema.dropTable("todo_recurrences");
  await knex.schema.dropTable("categories");
  await knex.schema.dropTable("files");
  await knex.schema.dropTable("comments");
  await knex.schema.dropTable("tasks");
  await knex.schema.dropTable("projects");
  await knex.schema.dropTable("team_members");
  await knex.schema.dropTable("teams");
  await knex.schema.dropTable("users");
}
