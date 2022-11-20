import express from "express";
import "express-async-errors";
import globalErrorHandler from "./controllers/errorController";
import userRouter from "./routers/userRouter";
// import { Sequelize } from "sequelize";
// import config from "./database/config/database";
import db from "./database/models";

const app = express();

app.use(express.json());

// const connectToDB = async (): Promise<void> => {
//   const sequelize = new Sequelize(config.development);
//   try {
//     await sequelize.authenticate();
//     console.log("Connection to DB has been established successfully");
//   } catch (err) {
//     console.log("Unable to connect to the database", err);
//   }
// };
// const a = connectToDB();
// console.log(a);

db.sync({ force: true })
  .then(() => console.log("DB synced"))
  .catch((err: Error) => console.log(`Failed to sync DB: ${err.message}`));

app.use("/api/v1/users", userRouter);

app.use(globalErrorHandler);

export default app;
