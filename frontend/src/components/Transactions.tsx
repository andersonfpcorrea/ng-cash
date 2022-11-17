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
  "Cash-out": "bg-red-600 font-bold text-white italic",
  "Cash-in": "bg-green-600 font-bold text-white italic",
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
              <Td className={typeStyles[el.type]}>{el.type}</Td>
              <Td>{el.from === user ? "me" : el.from}</Td>
              <Td>{el.to === user ? "me" : el.from}</Td>
              <Td>{el.createdAt}</Td>
              <Td isNumeric className="text-lg font-bold">
                {el.amount}$
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
