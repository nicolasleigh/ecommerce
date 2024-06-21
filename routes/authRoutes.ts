import { Router } from "express";
import authControllers from "../controllers/authControllers";
import { authMiddleware } from "../middlewares/auth";
const router = Router();

router.post("/admin-login", authControllers.admin_login);
router.get("/get-user", authMiddleware, authControllers.getUser);

export default router;
