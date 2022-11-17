import { VStack } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import CurrentBalance from "../components/CurrentBalance";
import Transactions from "../components/Transactions";
import TransferForm from "../components/TransferForm";
import { transactions } from "../Mocks";

export default function Home(): ReactElement {
  const [balance] = useState(100);
  const [user] = useState("user1");

  return (
    <VStack className="p-2">
      <CurrentBalance balance={balance} />
      <Transactions transactions={transactions} user={user} />
      <TransferForm balance={balance} />
    </VStack>
  );
}
