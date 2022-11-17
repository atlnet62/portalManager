import express from "express";
import { getCookie, setCookie, removeCookie } from "../controllers/cookie.js";


const router = express.Router();
router.get("/add", setCookie);
router.get("/all", getCookie);
router.get("/remove", removeCookie);


export default router;
