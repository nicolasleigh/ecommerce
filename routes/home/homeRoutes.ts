import express from "express";
import homeControllers from "../../controllers/home/homeControllers";
const router = express.Router();

router.get("/get-categories", homeControllers.getCategories);
router.get("/get-products", homeControllers.getProducts);

export default router;
