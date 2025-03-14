import type { Knex } from "knex";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const BASE_PATH = process.cwd();
const DB_PATH = `/${process.env.DATABASE_PATH}` || "/db";
const DB_NAME = process.env.DATABASE_NAME || "Nextar";

const config = (): Knex.Config => ({
  client: "better-sqlite3",
  connection: {
    filename: path.join(BASE_PATH, DB_PATH, `${DB_NAME}.sqlite3`),
  },
  migrations: {
    directory: path.join(BASE_PATH, "migrations"),
    extension: "ts",
  },
  seeds: {
    directory: path.join(BASE_PATH, "seeds"),
  },
  useNullAsDefault: true,
});

export default config;
