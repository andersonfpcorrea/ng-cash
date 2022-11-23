import express from "express";
import "express-async-errors";
import globalErrorHandler from "./controllers/errorController";
import userRouter from "./routers/userRouter";
import dashboardRouter from "./routers/dashboardRouter";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Allow cross-origin request:
app.use(cors());

// Configure resonse to OPTIONS requests:
app.options("*", cors());

// To limit request body size
app.use(express.json({ limit: "10kb" }));
// To parse cookie data
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/dashboard", dashboardRouter);

// Handles all errors:
app.use(globalErrorHandler);

export default app;
