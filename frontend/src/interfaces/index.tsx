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

export interface IFiltersProps {
  list: ITransaction[];
  setList: React.Dispatch<React.SetStateAction<ITransaction[]>>;
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

export interface Store {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}
