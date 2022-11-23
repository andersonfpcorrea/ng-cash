import { Flex, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ToBeDeveloped(): ReactElement {
  const [timer, setTimer] = useState(5);
  const [intervalID, setIntervalID] = useState<NodeJS.Timer | number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    const int = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
    setIntervalID(int);
    return () => clearInterval(int);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(intervalID);
      navigate(-1);
    }
  }, [timer]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <VStack>
        <Text>To be developed...</Text>
        <Text>Redirecting back in {timer}</Text>
      </VStack>
    </Flex>
  );
}
