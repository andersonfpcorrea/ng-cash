export interface ITransactionProps {
  transactions: ITransactionResponseData[];
  accountId: number;
}

export interface ITransferFormProps {
  balance: number;
  setters: {
    setAccount: React.Dispatch<React.SetStateAction<IAccountResponseData>>;
    setUser: React.Dispatch<React.SetStateAction<IUserResponseData>>;
    setTransactions: React.Dispatch<
      React.SetStateAction<ITransactionResponseData[]>
    >;
  };
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
  debitedAccount: { id: number; user: { username: string } };
  creditedAccount: { id: number; user: { username: string } };
}

export interface IDashboardResponseData {
  account: IAccountResponseData;
  transactions: ITransactionResponseData[];
  user: IUserResponseData;
}

export interface ISignupResponse {
  status: string;
  token: string;
  data: {
    user: IUserResponseData;
  };
}

export interface IAuthErrorResponse {
  error: { statusCode: number; status: string };
  message: string;
}
