import { Iconfig } from "../interfaces";

const config: Iconfig = {
  development: {
    username: process.env.POSTGRES_USER ?? "postgres",
    password: process.env.POSTGRES_PASSWORD ?? "postgres",
    database: process.env.POSTGRES_DB ?? "postgres",
    host: process.env.POSTGRES_HOST ?? "localhost",
    port: Number(process.env.POSTGRES_PORT) ?? 5432,
    dialect: "postgres",
  },
  test: {
    username: process.env.POSTGRES_USER ?? "postgres",
    password: process.env.POSTGRES_PASSWORD ?? "postgres",
    database: process.env.POSTGRES_DB ?? "postgres",
    host: process.env.POSTGRES_HOST ?? "localhost",
    port: Number(process.env.POSTGRES_PORT) ?? 5432,
    dialect: "postgres",
  },
  production: {
    username: process.env.POSTGRES_USER ?? "postgres",
    password: process.env.POSTGRES_PASSWORD ?? "postgres",
    database: process.env.POSTGRES_DB ?? "postgres",
    host: process.env.POSTGRES_HOST ?? "localhost",
    port: Number(process.env.POSTGRES_PORT) ?? 5432,
    dialect: "postgres",
  },
};

export = config;
