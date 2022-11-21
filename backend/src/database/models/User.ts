import { Model, INTEGER, STRING } from "sequelize";
import sequelize from ".";
import bcrypt from "bcryptjs";

class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare accountId: number;

  isCorrectPassword = async (
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean> => await bcrypt.compare(candidatePassword, userPassword);
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

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 12);
  user.password = hashedPassword;
});

export default User;
