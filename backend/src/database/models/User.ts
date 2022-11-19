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
      unique: true,
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
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
Account.hasOne(User, { foreignKey: "accountId" });

export default User;
