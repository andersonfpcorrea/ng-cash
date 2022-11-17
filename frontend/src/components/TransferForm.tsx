import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { ITransferFormProps } from "../interfaces";
import { MIN_USERNAME_LENGTH } from "../utils/config";

export default function TransferForm({
  balance,
}: ITransferFormProps): ReactElement {
  const [transferTo, setTransferTo] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [erroMsg, setErrorMsg] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { target } = e;
    setErrorMsg(false);

    target.type === "text"
      ? setTransferTo(target.value)
      : setAmount(Number(target.value));

    console.log(amount, transferTo);
  };

  const isValidInput = (): boolean => {
    return (
      amount <= balance &&
      amount > 0 &&
      transferTo.length >= MIN_USERNAME_LENGTH
    );
  };

  const handleSubmit = ({
    target,
  }: React.FormEvent<HTMLButtonElement>): void => {
    setIsSubmitting(true);
    if (!isValidInput()) {
      setIsSubmitting(false);
      setErrorMsg(true);
    } else {
      setIsSubmitting(false);
      console.log("success");
    }
  };

  return (
    <Flex className="flex-col gap-4 p-4 rounded-xl border-2 w-full">
      <Text className="font-bold">Transfer money</Text>
      <FormControl isInvalid={erroMsg}>
        <Flex className="gap-2 justify-between items-end">
          <Flex className="flex-col">
            <FormLabel>Transfer to</FormLabel>
            <Input
              type="text"
              isRequired
              value={transferTo}
              onChange={handleInput}
            />
          </Flex>
          <Flex className="flex-col">
            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              min={0}
              max={balance}
              isRequired
              value={`${amount}`}
              onChange={handleInput}
            />
          </Flex>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            isLoading={isSubmitting}
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Flex>
        {erroMsg ? (
          <FormErrorMessage>Write a valid username and amount</FormErrorMessage>
        ) : (
          <FormHelperText>Write a username</FormHelperText>
        )}
      </FormControl>
    </Flex>
  );
}
