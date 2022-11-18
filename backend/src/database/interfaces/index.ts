import { Options } from "sequelize";

export interface Iconfig {
  development: Options;
  test: Options;
  production: Options;
}
