import express from "express";
import orderController from "../../controllers/order/orderController";
const router = express.Router();

router.post("/home/order/place-order", orderController.placeOrder);
router.get("/home/customer/get-dashboard-data/:userId", orderController.getCustomerDashboardData);
router.get("/home/customer/get-orders/:customerId/:status", orderController.getOrders);

export default router;
