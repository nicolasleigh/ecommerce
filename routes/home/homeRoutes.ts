import express from "express";
import homeControllers from "../../controllers/home/homeControllers";
const router = express.Router();

router.get("/get-categories", homeControllers.getCategories);
router.get("/get-products", homeControllers.getProducts);
router.get("/price-range-latest-product", homeControllers.priceRangeProduct);
router.get("/query-products", homeControllers.queryProducts);
router.get("/product-details/:slug", homeControllers.productDetails);
router.post("/customer/submit-review", homeControllers.submitReview);
router.get("/customer/get-reviews/:productId", homeControllers.getReviews);

export default router;
