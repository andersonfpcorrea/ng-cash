import express from "express";
import "express-async-errors";
import globalErrorHandler from "./controllers/errorController";
import userRouter from "./routers/userRouter";
import dashboardRouter from "./routers/dashboardRouter";
import cookieParser from "cookie-parser";
import Transaction from "./database/models/Transaction";

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/dashboard", dashboardRouter);

app.get("/api/v1/test", async (_req, res) => {
  const result = await Transaction.create({
    debitedAccountId: 1,
    creditedAccountId: 3,
    value: 15,
    createdAt: Date.now(),
  });
  res.status(200).json(result);
});

app.use(globalErrorHandler);

export default app;
