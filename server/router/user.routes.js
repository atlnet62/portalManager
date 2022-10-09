import express from "express";
import {
    signup,
    signin,
    allUser,
    selectUser,
    addUser,
    resetPassword,
    removeUser,
    updateUser,
} from "../controllers/user.js";

const router = express.Router();
/**
 * Create or login routes
 */
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/add", addUser);

/**
 * List user routes
 */

router.get("/all", allUser);
router.get("/profile/:uuid", selectUser);

/**
 * Modification password
 */

router.patch("/reset-password/:uuid", resetPassword);


/**
 * Delete a profil
 */

router.delete("/remove/:uuid", removeUser)

/**
 * Modification a data on profil
 */

router.patch("/update/:uuid", updateUser);

export default router;
