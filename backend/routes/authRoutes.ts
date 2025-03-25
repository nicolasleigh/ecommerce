import { Router } from "express";
import authControllers from "../controllers/authControllers";
import { authMiddleware } from "../middlewares/auth";
const router = Router();

router.post("/admin-login", authControllers.admin_login);
router.get("/get-user", authMiddleware, authControllers.getUser);
router.post("/seller-register", authControllers.seller_register);
router.post("/seller-login", authControllers.seller_login);
router.post("/profile-image-upload", authMiddleware, authControllers.profileImageUpload);
router.post("/profile-info-add", authMiddleware, authControllers.profileInfoAdd);
router.post("/update-password", authMiddleware, authControllers.updatePassword);
router.get("/logout", authMiddleware, authControllers.logout);

export default router;
