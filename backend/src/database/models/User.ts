import { Model, INTEGER, STRING } from "sequelize";
import db from ".";
import Account from "./Account";

class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare accountId: number;
}

User.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 3,
      },
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    accountId: { type: INTEGER },
  },
  {
    sequelize: db,
    modelName: "users",
    timestamps: false,
  }
);

User.belongsTo(Account, { foreignKey: "accountId" });

export default User;
