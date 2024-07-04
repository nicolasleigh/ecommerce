import express from "express";
import orderController from "../../controllers/order/orderController";
const router = express.Router();

router.post("/home/order/place-order", orderController.placeOrder);

export default router;
