import { Sequelize } from "sequelize";
import * as config from "../config/database";

const env = process.env.NODE_ENV ?? "development";

export default new Sequelize(config[env]);
