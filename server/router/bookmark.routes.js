import express from "express";
import { addBookmark, allBookmark, removeBookmark, selectBookmark, updateCounter } from "../controllers/bookmark.js";

import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", auth, addBookmark);
router.delete("/remove/:bookmarkID", auth, removeBookmark);
router.get("/all", auth, allBookmark);
router.get("/:bookmarkID", auth, selectBookmark);

router.patch("/update-counter/:bookmarkID", auth, updateCounter);

export default router;