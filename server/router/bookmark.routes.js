import express from "express";
import { addBookmark, allBookmark, removeBookmark, updateBookmark, updateCounter } from "../controllers/bookmark.js";

import { auth } from "../middlewares/auth.js";
import { sanitize } from "../middlewares/sanitize.js";
import {isUser} from "../middlewares/role.js";

const router = express.Router();

router.post("/add", auth, sanitize, isUser, addBookmark);
router.delete("/remove/:bookmarkID", auth, sanitize, isUser, removeBookmark);
router.get("/all", auth, sanitize, isUser, allBookmark);
router.patch("/update-counter/:bookmarkID", auth, sanitize, isUser, updateCounter);
router.patch("/update/:bookmarkID", auth, sanitize, isUser, updateBookmark);

export default router;
