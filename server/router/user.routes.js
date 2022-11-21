import express from "express";
import { signup, signin, allUser, selectUser, addUser, resetPassword, removeUser, updateUser, updateValidatedEmail } from "../controllers/user.js";
import { auth } from "../middlewares/auth.js";
import { sanitize } from "../middlewares/sanitize.js";
import { isAdmin, isUser } from "../middlewares/role.js";

const router = express.Router();

/**
 * Create or login routes
 */
router.post("/signup", sanitize, signup);
router.post("/signin", sanitize, signin);
router.post("/add", auth, sanitize, isAdmin, addUser);

/**
 * List user routes
 */
router.get("/all", auth, sanitize, isAdmin, allUser);
router.get("/checkToken", auth, sanitize, selectUser);
router.get("/:userUUID", auth, sanitize, isAdmin, selectUser);
router.patch("/reset-password/:userUUID", auth, sanitize, isUser, resetPassword);
router.delete("/remove/:userUUID", auth, sanitize, isAdmin, removeUser);
router.patch("/update/:userUUID", auth, sanitize, isUser, updateUser);

// Malling

router.patch("/validateAccount/:uuid", sanitize, updateValidatedEmail);

export default router;
