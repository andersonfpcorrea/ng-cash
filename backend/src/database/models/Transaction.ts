import { Model, INTEGER, DATE } from "sequelize";
import db from ".";

class Transaction extends Model {
  declare id: number;
  declare debitedAccountId: number;
  declare creditedAccountId: number;
  declare value: number;
  declare createdAt: number;
}

Transaction.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    debitedAccountId: {
      type: INTEGER,
      references: {
        model: "Account",
        key: "id",
      },
    },
    creditedAccountId: {
      type: INTEGER,
      references: {
        model: "Account",
        key: "id",
      },
    },
    value: { type: INTEGER, allowNull: false },
    createdAt: { type: DATE },
  },
  {
    sequelize: db,
    modelName: "transactions",
    timestamps: true,
    updatedAt: false,
  }
);

export default Transaction;
