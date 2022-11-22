import { useState, ReactElement } from "react";
import {
  IAccountResponseData,
  ITransactionResponseData,
  IUserResponseData,
} from "../interfaces";
import Context from "./Context";

function AppContext({ children }: React.PropsWithChildren): ReactElement {
  const [user, setUser] = useState<IUserResponseData>({
    id: 0,
    username: "",
    accountId: 0,
  });
  const [token, setToken] = useState("");
  const [account, setAccount] = useState<IAccountResponseData>({
    id: 0,
    balance: 0,
  });
  const [transactions, setTransactions] = useState<ITransactionResponseData[]>([
    {
      id: 0,
      debitedAccountId: 0,
      creditedAccountId: 0,
      value: 0,
      createdAt: "",
    },
  ]);

  const store = {
    user,
    setUser,
    token,
    setToken,
    account,
    setAccount,
    transactions,
    setTransactions,
  };

  return <Context.Provider value={store}>{children}</Context.Provider>;
}

export default AppContext;
