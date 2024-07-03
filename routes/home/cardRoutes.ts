import express from "express";
import cardController from "../../controllers/home/cardController";
const router = express.Router();

router.post("/home/product/add-to-card", cardController.addToCard);
router.get("/home/product/get-card-product/:userId", cardController.getCardProducts);
router.delete("/home/product/delete-card-product/:id", cardController.deleteCardProduct);
router.put("/home/product/quantity-increment/:id", cardController.quantityIncrement);
router.put("/home/product/quantity-decrement/:id", cardController.quantityDecrement);

export default router;
