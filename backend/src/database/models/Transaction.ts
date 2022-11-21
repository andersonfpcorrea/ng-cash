import { Model, INTEGER, DATE } from "sequelize";
import sequelize from ".";

class Transaction extends Model {
  declare id: number;
  declare debitedAccountId: number;
  declare creditedAccountId: number;
  declare value: number;
  declare createdAt: number;
}

Transaction.init(
  {
    debitedAccountId: {
      type: INTEGER,
      references: {
        model: "accounts",
        key: "id",
      },
    },
    creditedAccountId: {
      type: INTEGER,
      references: {
        model: "accounts",
        key: "id",
      },
    },
    value: { type: INTEGER, allowNull: false },
    createdAt: { type: DATE },
  },
  {
    sequelize,
    modelName: "transactions",
    timestamps: true,
    updatedAt: false,
  }
);

export default Transaction;
