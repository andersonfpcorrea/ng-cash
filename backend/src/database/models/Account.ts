"use strict";
import { Model, INTEGER } from "sequelize";
import sequelize from ".";
import Transaction from "./Transaction";

class Account extends Model {
  declare id: number;
  declare balance: number;
}

Account.init(
  {
    // id: {
    //   type: INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    //   allowNull: false,
    // },
    balance: { type: INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "accounts",
    timestamps: false,
  }
);

// Account.addHook("afterSave", () => console.log("teste 1 2 3"));

Transaction.belongsTo(Account, { foreignKey: "debitedAccountId" });
Transaction.belongsTo(Account, { foreignKey: "creditedAccountId" });
Account.hasMany(Transaction, { foreignKey: "debitedAccountId" });
Account.hasMany(Transaction, { foreignKey: "creditedAccountId" });

export default Account;
