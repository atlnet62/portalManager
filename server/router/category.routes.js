import express from "express";
import { addCategory, allCategory, removeCategory, updateCategory } from "../controllers/category.js";
import {auth} from "../middlewares/auth.js"

const router = express.Router();
/**
 * Create or login routes
 */

router.post("/add", auth, addCategory);
router.delete("/remove/:categoryID", auth, removeCategory);

router.get("/all", auth, allCategory);

router.patch("/update/:categoryID", auth, updateCategory);

export default router;
