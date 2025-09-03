import express from "express";
const router = express.Router();

import {
  createCategory,
  getCategories,
  getParentCategories,
  getSubCategories
} from "../controllers/category.controller.js";

router.post("/create", createCategory);
router.get("/", getCategories);
router.get("/parents", getParentCategories);
router.get("/sub-categories/:parentId", getSubCategories);

export default router;
