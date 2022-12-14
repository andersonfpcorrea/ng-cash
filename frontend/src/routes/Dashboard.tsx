import { Flex, VStack } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import CurrentBalance from "../components/CurrentBalance";
import Filters from "../components/Filters";
import NavBar from "../components/NavBar";
import Transactions from "../components/Transactions";
import TransferForm from "../components/TransferForm";
import {
  IAccountResponseData,
  IDashboardResponseData,
  ITransactionResponseData,
  IUserResponseData,
} from "../interfaces";
import { requestDashboardData } from "../services/requests/dashboard";
import { useNavigate } from "react-router-dom";

export default function Dashboard(): ReactElement {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUserResponseData>({
    id: 0,
    accountId: 0,
    username: "",
  });
  const [account, setAccount] = useState<IAccountResponseData>({
    balance: 0,
    id: 0,
  });
  const [transactions, setTransactions] = useState<ITransactionResponseData[]>([
    {
      id: 0,
      debitedAccountId: 0,
      creditedAccountId: 0,
      value: 0,
      createdAt: "",
      debitedAccount: { id: 0, user: { username: "" } },
      creditedAccount: { id: 0, user: { username: "" } },
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // After the component is mounted, it is requested the users' data to the api
    const t = sessionStorage.getItem("token") as string;
    requestDashboardData(t)
      .then((res) => {
        const data = res.data as IDashboardResponseData;
        // The data is stored in state and distributed to the children componenets
        setAccount(data.account);
        setTransactions(data.transactions);
        setUser(data.user);
        setIsLoading(false);
      })
      .catch((err) => {
        // If there is no token on the request, the dashboard is not rendered
        console.error(err);
        alert("You are not logged in");
        // ...and the user is redirect to login page
        navigate("/login");
      });
  }, []);

  const Loading = <div className="text-3xl">Loading...</div>;

  const Main = (
    <VStack className="gap-4">
      <NavBar user={user.username} />
      <Flex className="flex-col p-2 rounded-xl border-2 shadow-md gap-4">
        <CurrentBalance balance={account.balance} />
        <Flex className="flex-col border-2 rounded-xl gap-4 py-4">
          <Filters
            list={transactions}
            setList={setTransactions}
            accountId={user.accountId}
          />
          <Transactions
            transactions={transactions}
            accountId={user.accountId}
          />
        </Flex>
        <TransferForm
          balance={account.balance}
          setters={{ setAccount, setTransactions, setUser }}
        />
      </Flex>
    </VStack>
  );

  return isLoading ? Loading : Main;
}
