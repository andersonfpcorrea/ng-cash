import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { ITransactionProps, ITransactionResponseData } from "../interfaces";

// Tailwind classes for "type" table data elements
const typeStyles = {
  "Cash-out": "font-bold text-red-600",
  "Cash-in": "font-bold text-green-600",
};

export default function Transactions({
  transactions,
  accountId,
}: ITransactionProps): ReactElement {
  // To make sure the transactions appear in order of creation, we sorte the list by date
  const sortListByDate = (
    list: ITransactionResponseData[]
  ): ITransactionResponseData[] =>
    list.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  return (
    <TableContainer className="w-full">
      <Table>
        <Thead>
          <Tr>
            <Th>Type</Th>
            <Th>From</Th>
            <Th>To</Th>
            <Th>Date</Th>
            <Th isNumeric>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortListByDate(transactions).map((el) => (
            <Tr key={el.id}>
              <Td
                className={`${
                  el.debitedAccountId === accountId
                    ? typeStyles["Cash-out"]
                    : typeStyles["Cash-in"]
                }`}
              >
                {el.debitedAccountId === accountId ? "Cash-out" : "Cash-in"}
              </Td>
              <Td>{el.debitedAccount.user.username}</Td>
              <Td>{el.creditedAccount.user.username}</Td>
              <Td>
                {Intl.DateTimeFormat("pt-BR").format(new Date(el.createdAt))}
              </Td>
              <Td>{el.value}$</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
