import { Router } from "express";
import categoryController from "../controllers/categoryController";
import { authMiddleware } from "../middlewares/auth";
const router = Router();

router.post("/category-add", authMiddleware, categoryController.addCategory);
router.get("/category-get", authMiddleware, categoryController.getCategory);

export default router;
