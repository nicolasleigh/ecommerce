import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import productController from "../controllers/productController";
const router = Router();

router.post("/product-add", authMiddleware, productController.productAdd);
router.get("/products-get", authMiddleware, productController.productsGet);

export default router;
