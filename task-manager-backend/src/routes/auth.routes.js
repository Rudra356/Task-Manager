import express from "express";
import { register, login, getProfile } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// protected route to get logged in user's profile
router.get("/profile", authMiddleware, getProfile);

export default router;
