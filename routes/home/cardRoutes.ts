import express from "express";
import cardController from "../../controllers/home/cardController";
const router = express.Router();

router.post("/home/product/add-to-card", cardController.addToCard);

export default router;
