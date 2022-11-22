import { createContext } from "react";
import { Store } from "../interfaces";

const Context = createContext<Store>({
  username: "",
  setUsername: () => {},
  token: "",
  setToken: () => {},
});

export default Context;
