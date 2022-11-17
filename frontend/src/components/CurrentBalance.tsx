import { Flex, Text } from "@chakra-ui/react";
import { ReactElement } from "react";

interface ICurrentBalance {
  balance: number;
}

export default function CurrentBalance({
  balance = 0,
}: ICurrentBalance): ReactElement {
  const today = Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(Date.now());

  return (
    <Flex className="w-full justify-between gap-8 items-end">
      <Flex className="flex-col">
        <Text className="font-medium text-2xl">Current Balance</Text>
        <Text className="text-gray-500 text-sm">As of {today}</Text>
      </Flex>
      <Text className="font-medium text-5xl">{balance}$</Text>
    </Flex>
  );
}
