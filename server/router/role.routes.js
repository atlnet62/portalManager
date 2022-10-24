import express from "express";
import {
    addRole,
    allRole,
    removeRole,
    updateRole,
} from "../controllers/role.js";

import { auth } from "../middlewares/auth.js";

const router = express.Router();
/**
 * Create or login routes
 */

router.post("/add", addRole);
router.delete("/remove/:roleID", removeRole);

router.get("/all", auth, allRole);

router.patch("/update/:roleID", updateRole);

export default router;
