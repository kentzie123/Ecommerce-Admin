import express from "express";
const router = express.Router();

import {
  createCategory,
  getCategories,
  getParentCategories,
  getSubCategories,
  updateCategoryById,
  getCategoryById,
} from "../controllers/category.controller.js";

router.post("/create", createCategory);
router.get("/", getCategories);
router.get("/by-id/:categoryId", getCategoryById);
router.get("/parents", getParentCategories);
router.get("/sub-categories/:parentId", getSubCategories);
router.patch("/update/:categoryId", updateCategoryById);

export default router;
