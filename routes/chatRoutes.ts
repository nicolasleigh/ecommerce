import express from "express";
import chatController from "../controllers/chat/chatController";
const router = express.Router();

router.post("/chat/customer/add-customer-friend", chatController.addCustomerFriend);
router.post("/chat/customer/send-message-to-seller", chatController.AddCustomerMessage);

export default router;
