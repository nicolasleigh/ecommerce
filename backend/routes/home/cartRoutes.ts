import express from "express";
import cartController from "../../controllers/home/cartController";
const router = express.Router();

router.post("/home/product/add-to-cart", cartController.addToCart);
router.get("/home/product/get-cart-product/:userId", cartController.getCartProducts);
router.delete("/home/product/delete-cart-product/:id", cartController.deleteCartProduct);
router.put("/home/product/quantity-increment/:id", cartController.quantityIncrement);
router.put("/home/product/quantity-decrement/:id", cartController.quantityDecrement);
router.post("/home/product/add-to-wishlist", cartController.addWishlist);
router.get("/home/product/get-wishlist-products/:userId", cartController.getWishlist);
router.delete("/home/product/remove-wishlist-product/:wishlistId", cartController.removeWishlist);

export default router;
