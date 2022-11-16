import { Flex } from "@chakra-ui/react";
import { ReactElement } from "react";
import CurrentBalance from "../components/CurrentBalance";

export default function Home(): ReactElement {
  return (
    <Flex>
      <CurrentBalance />
    </Flex>
  );
}
