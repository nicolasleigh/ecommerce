import express from "express";
import chatController from "../controllers/chat/chatController";
import { authMiddleware } from "../middlewares/auth";
const router = express.Router();

router.post("/chat/customer/add-customer-friend", chatController.addCustomerFriend);
router.post("/chat/customer/send-message-to-seller", chatController.AddCustomerMessage);
router.get("/chat/seller/get-customers/:sellerId", chatController.getCustomers);
router.get("/chat/seller/get-customer-message/:customerId", authMiddleware, chatController.getCustomersSellerMessage);
router.post("/chat/seller/send-message-to-customer", authMiddleware, chatController.addSellerMessage);
router.get("/chat/admin/get-sellers", authMiddleware, chatController.getSellers);
router.post("/chat/message-send-seller-admin", authMiddleware, chatController.seller_admin_message_insert);
router.get("/chat/get-admin-message/:receiverId", authMiddleware, chatController.get_admin_message);
router.get("/chat/get-seller-message", authMiddleware, chatController.get_seller_message);

export default router;
