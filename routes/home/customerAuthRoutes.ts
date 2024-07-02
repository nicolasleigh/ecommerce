import express from "express";
import customerAuthController from "../../controllers/home/customerAuthController";
const router = express.Router();

router.post("/customer/customer-register", customerAuthController.customerRegister);

export default router;
