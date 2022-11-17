import { Flex, Input, Radio, RadioGroup, Text } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { IFiltersProps } from "../interfaces";

export default function Filters({
  list,
  setList,
}: IFiltersProps): ReactElement {
  const [cacheList] = useState(list);

  const handleRadio = (type: string): void => {
    console.log(type);

    if (type === "all") setList(cacheList);
    else if (type === "Cash-in")
      setList(cacheList.filter((el) => el.type === type));
    else if (type === "Cash-out")
      setList(cacheList.filter((el) => el.type === type));
  };

  return (
    <Flex className="w-full items-center gap-6 flex-wrap px-6">
      <Text className="font-semibold">Filters:</Text>
      <RadioGroup onChange={handleRadio}>
        <Flex className="gap-4 justify-between text-xs">
          <Radio value="all">All</Radio>
          <Radio value="Cash-in">In</Radio>
          <Radio value="Cash-out">Out</Radio>
        </Flex>
      </RadioGroup>
      <RadioGroup onChange={(e) => console.log(e)}>
        <Input type="date" />
      </RadioGroup>
    </Flex>
  );
}
