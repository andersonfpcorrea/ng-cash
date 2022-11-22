import { createContext } from "react";
import { Store } from "../interfaces";

const Context = createContext<Store>({
  user: {
    id: 0,
    username: "",
    accountId: 0,
  },
  setUser: () => {},
  token: "",
  setToken: () => {},
  account: { id: 0, balance: 0 },
  setAccount: () => {},
  transactions: [
    {
      id: 0,
      debitedAccountId: 0,
      creditedAccountId: 0,
      value: 0,
      createdAt: "",
    },
  ],
  setTransactions: () => {},
});

export default Context;
