import { Options } from "sequelize";

interface IDictionary<TValue> {
  [key: string]: TValue;
}

export interface Iconfig extends IDictionary<Options> {
  development: Options;
  test: Options;
  production: Options;
}
