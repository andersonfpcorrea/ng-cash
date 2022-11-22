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
import { AxiosError } from "axios";
import { ReactElement, useState } from "react";
import {
  IAuthErrorResponse,
  IDashboardResponseData,
  ITransferFormProps,
} from "../interfaces";
import { requestTransfer } from "../services/requests/dashboard";
import { MIN_USERNAME_LENGTH } from "../utils/config";

export default function TransferForm({
  balance,
  setters,
}: ITransferFormProps): ReactElement {
  const [transferTo, setTransferTo] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [erroMsg, setErrorMsg] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setAccount, setTransactions, setUser } = setters;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { target } = e;
    setErrorMsg(false);

    target.type === "text"
      ? setTransferTo(target.value)
      : setAmount(Number(target.value));
  };

  const isValidInput = (): boolean => {
    return (
      amount <= balance &&
      amount > 0 &&
      transferTo.length >= MIN_USERNAME_LENGTH
    );
  };

  const handleSubmit = async ({
    target,
  }: React.FormEvent<HTMLButtonElement>): Promise<void> => {
    setIsSubmitting(true);
    // If one of the inputs are invalid the data is not submited
    if (!isValidInput()) {
      setIsSubmitting(false);
      return setErrorMsg(true);
    }
    // If all data is ok, they are posted to the api
    const token = sessionStorage.getItem("token") as string;
    try {
      const result = await requestTransfer(transferTo, amount, token);
      const data = result.data as IDashboardResponseData;
      // The api return updated user data, that is feed into the dashboard state
      setAccount(data.account);
      setTransactions(data.transactions);
      setUser(data.user);
      setIsSubmitting(false);
      console.log(result);
    } catch (err) {
      // In case of fail, an alert window show the error to the user
      const error = err as AxiosError;
      const data = error.response?.data as IAuthErrorResponse;
      alert(data.message);
    } finally {
      setIsSubmitting(false);
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
