import express from "express";
import "express-async-errors";
import globalErrorHandler from "./controllers/errorController";
import userRouter from "./routers/userRouter";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);

app.use(globalErrorHandler);

export default app;
