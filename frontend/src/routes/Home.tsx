import { Flex } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import CurrentBalance from "../components/CurrentBalance";

export default function Home(): ReactElement {
  const [balance] = useState(0);
  return (
    <Flex>
      <CurrentBalance balance={balance} />
    </Flex>
  );
}
