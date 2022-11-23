import { Flex, Input, Radio, RadioGroup, Text } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { IFiltersProps } from "../interfaces";

export default function Filters({
  list,
  setList,
  accountId,
}: IFiltersProps): ReactElement {
  const [cacheList] = useState(list);

  const handleFilters = (type: string, date?: string): void => {
    // Handling type of movement filtering
    if (type === "all") setList(cacheList);
    else if (type === "Cash-in")
      setList(cacheList.filter((el) => el.creditedAccountId === accountId));
    else if (type === "Cash-out")
      setList(cacheList.filter((el) => el.debitedAccountId === accountId));

    // For handling date filtering
    if (typeof date === "string") {
      // The built-in calender gives date values "delayed" by hours, so we need to apply this correction:
      const twelveHours = 43200000; // This equals 12h * 60m * 60s * 1000ms
      const selectedDate = new Date(date);

      const newList =
        list.length > 0
          ? list.filter(
              (el) =>
                new Date(el.createdAt).getTime() >=
                selectedDate.getTime() + twelveHours
            )
          : cacheList.filter(
              (el) =>
                new Date(el.createdAt).getTime() >=
                selectedDate.getTime() + twelveHours
            );

      setList(newList);
    }
  };

  return (
    <Flex className="w-full items-center gap-6 flex-wrap px-6">
      <Text className="font-semibold">Filters:</Text>
      <RadioGroup onChange={handleFilters}>
        <Flex className="gap-4 justify-between text-xs">
          <Radio value="all">All</Radio>
          <Radio value="Cash-in">In</Radio>
          <Radio value="Cash-out">Out</Radio>
          <Input
            type="date"
            name="date"
            onChange={({ target }) => handleFilters(target.type, target.value)}
          />
        </Flex>
      </RadioGroup>
    </Flex>
  );
}
