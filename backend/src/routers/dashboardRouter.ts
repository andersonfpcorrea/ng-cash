import { Router } from "express";
import * as authController from "../controllers/authController";
import * as dashboardController from "../controllers/dashboardController";

const router = Router();

// Protect all routes
router.use(authController.protect);

router.get("/", dashboardController.getData);
router.post("/transfer", dashboardController.transferMoney);

export default router;
