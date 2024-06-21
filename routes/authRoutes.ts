import { Router } from "express";
import authControllers from "../controllers/authControllers";
const router = Router();

router.post("/admin-login", authControllers.admin_login);

export default router;
