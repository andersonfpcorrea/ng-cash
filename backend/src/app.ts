import express from "express";
import globalErrorHandler from "./controllers/errorController";
import userRouter from "./routers/userRouter";

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);

app.use(globalErrorHandler);

export default app;
