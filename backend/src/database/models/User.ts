import { Model, INTEGER, STRING } from "sequelize";
import sequelize from ".";

class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare accountId: number;
}

User.init(
  {
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

export default User;
