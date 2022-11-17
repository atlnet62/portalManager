import express from "express";
import { addCategory, allCategory, removeCategory, updateCategory } from "../controllers/category.js";
import { auth } from "../middlewares/auth.js";
import { sanitize } from "../middlewares/sanitize.js";
import { isUser } from "../middlewares/role.js";

const router = express.Router();

/**
 * Create or login routes
 */
router.post("/add", auth, sanitize, isUser, addCategory);
router.delete("/remove/:categoryID", auth, sanitize, isUser, removeCategory);
router.get("/all", auth, sanitize, isUser, allCategory);
router.patch("/update/:categoryID", auth, sanitize, isUser, updateCategory);

export default router;
