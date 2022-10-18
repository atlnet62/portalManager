import express from "express";
import { signup, signin, allUser, selectUser, addUser, resetPassword, removeUser, updateUser } from "../controllers/user.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();
/**
 * Create or login routes
 */
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/add", auth, addUser);

/**
 * List user routes
 */

router.get("/all", auth, allUser);

// check du user connecté
router.get("/checkToken", auth, selectUser);

// select un user different de l'admin
router.get("/:userUUID", auth, selectUser);

/**
 * Modification password
 */

router.patch("/reset-password/:uuid", auth, resetPassword);

/**
 * Delete a profil
 */

router.delete("/remove/:uuid", auth, removeUser);

/**
 * Modification a data on profil
 */

router.patch("/update/:uuid", auth, updateUser);

export default router;
