export interface ITransaction {
  id: number;
  type: "Cash-in" | "Cash-out";
  from: string;
  to: string;
  createdAt: string;
  amount: number;
}

// export interface ITransactionResponseData {
//   id: number;
//   debitedAccountId: number;
//   creditedAccountId: number;
//   value: number;
//   createdAt: string;
// }

export interface ITransactionProps {
  transactions: ITransactionResponseData[];
  accountId: number;
}

export interface ITransferFormProps {
  balance: number;
}

export interface IFiltersProps {
  accountId: number;
  list: ITransactionResponseData[];
  setList: React.Dispatch<React.SetStateAction<ITransactionResponseData[]>>;
}

export interface IUserCredentials {
  username: string;
  password: string;
}

export interface IValidateUserDataReturn {
  usernameIsWrong: boolean;
  passwordIsWrong: boolean;
  messageUser: string;
  messagePassword: string;
}

export interface IUserResponseData {
  id: number;
  username: string;
  accountId: number;
}

export interface IAccountResponseData {
  id: number;
  balance: number;
}

export interface ITransactionResponseData {
  id: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
  createdAt: string;
}

export interface IDashboardResponseData {
  account: IAccountResponseData;
  transactions: ITransactionResponseData[];
  user: IUserResponseData;
}

export interface Store {
  user: IUserResponseData;
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: number;
      username: string;
      accountId: number;
    }>
  >;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  account: IAccountResponseData;
  setAccount: React.Dispatch<React.SetStateAction<IAccountResponseData>>;
  transactions: ITransactionResponseData[];
  setTransactions: React.Dispatch<
    React.SetStateAction<ITransactionResponseData[]>
  >;
}

export interface ISignupResponse {
  status: string;
  token: string;
  data: {
    user: IUserResponseData;
  };
}
