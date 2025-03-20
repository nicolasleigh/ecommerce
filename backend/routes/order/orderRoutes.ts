import express from "express";
import orderController from "../../controllers/order/orderController";
const router = express.Router();

// Customer
router.post("/home/order/place-order", orderController.placeOrder);
router.get("/home/customer/get-dashboard-data/:userId", orderController.getCustomerDashboardData);
router.get("/home/customer/get-orders/:customerId/:status", orderController.getOrders);
router.get("/home/customer/get-order-details/:orderId", orderController.getOrderDetails);

// Admin
router.get("/admin/orders", orderController.getAdminOrders);
router.get("/admin/order/:orderId", orderController.getAdminOrder);
router.put("/admin/order-status/update/:orderId", orderController.adminOrderStatusUpdate);

// Seller
router.get("/seller/orders/:sellerId", orderController.getSellerOrders);
router.get("/seller/order-stats", orderController.getPaymentStats);
router.get("/seller/all-orders", orderController.getAllOrders);
router.get("/seller/order/:orderId", orderController.getSellerOrder);
router.put("/seller/order-status/update/:orderId", orderController.sellerOrderStatusUpdate);

export default router;
