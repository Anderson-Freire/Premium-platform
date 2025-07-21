import { DataSource } from "typeorm";
import * as env from "dotenv";
env.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: ["src/**/*.entity.ts"],
  migrations: ["src/database/migrations/*.ts"],
});
