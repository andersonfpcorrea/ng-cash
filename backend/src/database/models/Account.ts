"use strict";
import { Model, INTEGER } from "sequelize";
import db from ".";
import Transaction from "./Transaction";
import User from "./User";

class Account extends Model {
  declare id: number;
  declare balance: number;
}

Account.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    balance: { type: INTEGER, allowNull: false, defaultValue: 100 },
  },
  {
    sequelize: db,
    modelName: "accounts",
    timestamps: false,
  }
);

Transaction.belongsTo(Account, { foreignKey: "debitedAccountId" });
Transaction.belongsTo(Account, { foreignKey: "creditedAccountId" });
Account.hasMany(Transaction, { foreignKey: "debitedAccountId" });
Account.hasMany(Transaction, { foreignKey: "creditedAccountId" });
Account.hasOne(User, { foreignKey: "accountId" });

export default Account;