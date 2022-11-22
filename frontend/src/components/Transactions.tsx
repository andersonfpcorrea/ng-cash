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
import { ITransactionProps } from "../interfaces";

const typeStyles = {
  "Cash-out": "font-bold text-red-600",
  "Cash-in": "font-bold text-green-600",
};

export default function Transactions({
  transactions,
  user,
}: ITransactionProps): ReactElement {
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
          {transactions.map((el) => (
            <Tr key={el.id}>
              <Td
                className={`${
                  el.debitedAccountId === user.accountId
                    ? typeStyles["Cash-out"]
                    : typeStyles["Cash-in"]
                }`}
              >
                {el.debitedAccountId === user.accountId
                  ? "Cash-out"
                  : "Cash-in"}
              </Td>
              <Td>{el.debitedAccountId}</Td>
              <Td>{el.creditedAccountId}</Td>
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
// !Continuar daqui: arrumar os dados "transactions"
