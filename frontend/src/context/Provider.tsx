import { useState, ReactElement } from "react";
import Context from "./Context";

function AppContext({ children }: React.PropsWithChildren): ReactElement {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  const store = {
    username,
    setUsername,
    token,
    setToken,
  };

  return <Context.Provider value={store}>{children}</Context.Provider>;
}

export default AppContext;
