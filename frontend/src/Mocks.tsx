import { ITransaction } from "./interfaces";

export const transactions: ITransaction[] = [
  {
    id: 1,
    type: "Cash-out",
    from: "user1",
    to: "user2",
    createdAt: "2022/11/10", // must be yyyy-mm-dd
    amount: 50,
  },
  {
    id: 2,
    type: "Cash-in",
    from: "user2",
    to: "user1",
    createdAt: "2022/11/11",
    amount: 200,
  },
  {
    id: 3,
    type: "Cash-in",
    from: "user3",
    to: "user1",
    createdAt: "2022/11/12",
    amount: 150,
  },
  {
    id: 4,
    type: "Cash-in",
    from: "user3",
    to: "user1",
    createdAt: "2022/11/12",
    amount: 15,
  },
  {
    id: 6,
    type: "Cash-out",
    from: "user1",
    to: "user3",
    createdAt: "2022/11/13",
    amount: 12,
  },
];

export const users = [
  {
    id: 1,
    username: "user1",
    password: "123456",
    accountId: 1,
  },
  {
    id: 2,
    username: "user2",
    password: "123456",
    accountId: 2,
  },
  {
    id: 3,
    username: "user3",
    password: "123456",
    accountId: 3,
  },
];
