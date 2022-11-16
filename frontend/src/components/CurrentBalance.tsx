import { Flex, Text, VStack } from "@chakra-ui/react";
import { ReactElement } from "react";

export default function CurrentBalance(): ReactElement {
  const today = Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    hour: "numeric",
  }).format(Date.now());

  return (
    <Flex>
      <VStack>
        <Text>Current Balance</Text>
        <Text>As of {today}</Text>
      </VStack>
    </Flex>
  );
}
