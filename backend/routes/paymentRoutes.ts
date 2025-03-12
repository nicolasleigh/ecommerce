import express from "express";
import chatController from "../controllers/chat/chatController";
import paymentController from "../controllers/payment/paymentController";
import { authMiddleware } from "../middlewares/auth";
const router = express.Router();

router.get("/payment/create-stripe-connect-account", authMiddleware, paymentController.createStripeConnectAccount);

export default router;
