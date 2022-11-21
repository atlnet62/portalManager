import express from "express";
import { pageNotFound } from "../controllers/index.js";

import userRoutes from "./user.routes.js";
import categoryRoutes from "./category.routes.js";
import roleRoutes from "./role.routes.js";
import bookmarkRoutes from "./bookmark.routes.js";

const router = express.Router();

router.use("/api/v1/user", userRoutes);
router.use("/api/v1/category", categoryRoutes);
router.use("/api/v1/role", roleRoutes);
router.use("/api/v1/bookmark", bookmarkRoutes);

router.all("/*", pageNotFound);

export default router;
