"use strict";
import { Model, INTEGER } from "sequelize";
import sequelize from ".";
import Transaction from "./Transaction";
import User from "./User";

class Account extends Model {
  declare id: number;
  declare balance: number;
}

Account.init(
  {
    balance: { type: INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "accounts",
    timestamps: false,
  }
);

Transaction.belongsTo(Account, {
  foreignKey: "debitedAccountId",
  as: "debitedAccount",
});
Transaction.belongsTo(Account, {
  foreignKey: "creditedAccountId",
  as: "creditedAccount",
});
Account.hasMany(Transaction, {
  foreignKey: "debitedAccountId",
  as: "debitTransaction",
});
Account.hasMany(Transaction, {
  foreignKey: "creditedAccountId",
  as: "creditTransaction",
});

User.belongsTo(Account, { foreignKey: "accountId", as: "account" });
Account.hasOne(User, { foreignKey: "accountId", as: "user" });

export default Account;
