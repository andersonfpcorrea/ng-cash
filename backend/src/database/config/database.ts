import { Iconfig } from "../interfaces/index";

const config: Iconfig = {
  development: {
    username: process.env.POSTGRES_USER ?? "postgres",
    password: process.env.POSTGRES_PASSWORD ?? "postgres",
    database: process.env.DB_NAME ?? "ngcash_dev",
    host: process.env.POSTGRES_HOST ?? "localhost",
    port: Number(process.env.POSTGRES_PORT) ?? 5432,
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASS ?? "root",
    database: process.env.DB_NAME ?? "ngcash_test",
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT) ?? 3306,
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASS ?? "root",
    database: process.env.DB_NAME ?? "ngcash_prod",
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT) ?? 3306,
    dialect: "postgres",
  },
};

export = config;
