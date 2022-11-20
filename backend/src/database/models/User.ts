import { Model, INTEGER, STRING } from "sequelize";
import sequelize from ".";
import Account from "./Account";

class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare accountId: number;
}

User.init(
  {
    // id: {
    //   type: INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    //   allowNull: false,
    // },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    accountId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: "accounts",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "users",
    timestamps: false,
  }
);

User.belongsTo(Account, { foreignKey: "accountId" });
Account.hasOne(User, { foreignKey: "accountId" });

export default User;
