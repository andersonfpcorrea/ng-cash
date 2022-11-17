import { Flex, VStack } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import CurrentBalance from "../components/CurrentBalance";
import Filters from "../components/Filters";
import NavBar from "../components/NavBar";
import Transactions from "../components/Transactions";
import TransferForm from "../components/TransferForm";
import { transactions } from "../Mocks";

export default function Home(): ReactElement {
  const [balance] = useState(100);
  const [user] = useState("user1");
  const [tableList, setTableList] = useState(transactions);

  return (
    <VStack className="gap-4">
      <NavBar user={user} />
      <Flex className="flex-col p-2 rounded-xl border-2 shadow-md gap-4 ">
        <CurrentBalance balance={balance} />
        <Flex className="flex-col border-2 rounded-xl gap-4 py-4">
          <Filters list={tableList} setList={setTableList} />
          <Transactions transactions={tableList} user={user} />
        </Flex>
        <TransferForm balance={balance} />
      </Flex>
    </VStack>
  );
}
