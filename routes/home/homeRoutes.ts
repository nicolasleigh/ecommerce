import express from "express";
import homeControllers from "../../controllers/home/homeControllers";
const router = express.Router();

router.get("/get-categories", homeControllers.getCategories);

export default router;
