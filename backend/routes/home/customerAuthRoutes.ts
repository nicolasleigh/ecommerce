import express from "express";
import customerAuthController from "../../controllers/home/customerAuthController";
const router = express.Router();

router.post("/customer/customer-register", customerAuthController.customerRegister);
router.post("/customer/customer-login", customerAuthController.customerLogin);
router.post("/customer/update-password", customerAuthController.customerUpdatePassword);
router.get("/customer/logout", customerAuthController.customerLogout);

export default router;
