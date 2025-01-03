import type { Knex } from "knex";
import path from "path";

const BASE_PATH = process.cwd();

const config: Knex.Config = {
  client: "better-sqlite3",
  connection: {
    filename: path.join(BASE_PATH, "db", "database.sqlite"),
  },
  migrations: {
    directory: path.join(BASE_PATH, "migrations"),
    extension: "ts",
  },
  seeds: {
    directory: path.join(BASE_PATH, "seeds"),
  },
  useNullAsDefault: true,
};

export default config;
