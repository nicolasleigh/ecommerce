import { Router } from "express";
import categoryController from "../controllers/categoryController";
import { authMiddleware } from "../middlewares/auth";
import sellerController from "../controllers/sellerController";
const router = Router();

router.get("/request-seller-get", authMiddleware, sellerController.getSellerRequest);
router.get("/get-seller/:sellerId", authMiddleware, sellerController.getSeller);
router.post("/seller-status-update", authMiddleware, sellerController.sellerStatusUpdate);
router.get("/get-sellers", authMiddleware, sellerController.getActiveSellers);
router.get("/get-deactive-sellers", authMiddleware, sellerController.getDeactiveSellers);

export default router;
