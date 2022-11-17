export interface ITransaction {
  id: number;
  type: "Cash-in" | "Cash-out";
  from: string;
  to: string;
  createdAt: string;
  amount: number;
}

export interface ITransactionProps {
  transactions: ITransaction[];
  user: string;
}

export interface ITransferFormProps {
  balance: number;
}
