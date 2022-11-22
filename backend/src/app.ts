import express from "express";
import "express-async-errors";
import globalErrorHandler from "./controllers/errorController";
import userRouter from "./routers/userRouter";
import dashboardRouter from "./routers/dashboardRouter";
import cookieParser from "cookie-parser";
import Transaction from "./database/models/Transaction";
import cors from "cors";

const app = express();

// Allow cross-origin request:
app.use(cors());
// Configure resonse to OPTIONS requests:
app.options("*", cors());

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/dashboard", dashboardRouter);

app.get("/api/v1/test", async (_req, res) => {
  const result = await Transaction.create({
    debitedAccountId: 12,
    creditedAccountId: 20,
    value: 25,
    createdAt: Date.now(),
  });
  res.status(200).json(result);
});

app.use(globalErrorHandler);

export default app;
