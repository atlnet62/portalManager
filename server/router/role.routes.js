import express from "express";
import { allRole } from "../controllers/role.js";

import { auth } from "../middlewares/auth.js";
import { sanitize } from "../middlewares/sanitize.js";
import { isUser } from "../middlewares/role.js";

const router = express.Router();
router.get("/all", auth, sanitize, isUser, allRole);


export default router;
