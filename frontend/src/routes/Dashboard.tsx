import { Flex, VStack } from "@chakra-ui/react";
import { ReactElement, useContext, useEffect, useState } from "react";
import CurrentBalance from "../components/CurrentBalance";
import Filters from "../components/Filters";
import NavBar from "../components/NavBar";
import Transactions from "../components/Transactions";
import TransferForm from "../components/TransferForm";
import { IDashboardResponseData } from "../interfaces";
import { transactions } from "../Mocks";
import { requestDashboardData } from "../services/requests/dashboard";
import Context from "../context/Context";

export default function Dashboard(): ReactElement {
  const { user, setAccount, setTransactions } = useContext(Context);
  const [balance, setBalance] = useState(0);
  const [tableList, setTableList] = useState(transactions);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    requestDashboardData()
      .then((res) => {
        const data = res.data as IDashboardResponseData;
        setAccount(data.account);
        setTransactions(data.transactions);
        setBalance(data.account.balance);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const Loading = <div className="text-9xl">Loading...</div>;

  const Main = (
    <VStack className="gap-4">
      <NavBar user={user.username} />
      <Flex className="flex-col p-2 rounded-xl border-2 shadow-md gap-4 ">
        <CurrentBalance balance={balance} />
        <Flex className="flex-col border-2 rounded-xl gap-4 py-4">
          <Filters list={tableList} setList={setTableList} />
          <Transactions transactions={tableList} user={user.username} />
        </Flex>
        <TransferForm balance={balance} />
      </Flex>
    </VStack>
  );

  return isLoading ? Loading : Main;
}
