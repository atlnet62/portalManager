import express from "express";
import {
    addCategory,
    allCategory,
    removeCategory,
    updateCategory,
} from "../controllers/category.js";

const router = express.Router();
/**
 * Create or login routes
 */

router.post("/add/:uuid", addCategory);
router.delete("/remove/:categoryID", removeCategory);

router.get("/all/:uuid", allCategory);

router.patch("/update/:categoryID", updateCategory);

export default router;
