import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import productController from "../controllers/productController";
const router = Router();

router.post("/product-add", authMiddleware, productController.productAdd);
router.get("/products-get", authMiddleware, productController.productsGet);
router.get("/product-get/:productId", authMiddleware, productController.productGet);
router.post("/product-update", authMiddleware, productController.productUpdate);
router.post("/product-image-update", authMiddleware, productController.productImageUpdate);

export default router;
