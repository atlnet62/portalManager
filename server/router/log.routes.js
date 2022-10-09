import express from "express";
import {
    checkIp
} from "../controllers/log.js";

const router = express.Router();

router.get("/ip", checkIp);

export default router;