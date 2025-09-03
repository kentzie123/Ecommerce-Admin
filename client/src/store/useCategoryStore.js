import { create } from "zustand";

// api
import api from "../lib/axios";

// toast
import toast from "react-hot-toast";

export const useCategoryStore = create((set, get) => ({
  isCreatingCategory: false,
  isUpdatingCategory: false,
  categories: [],
  parentCategories: [],
  subCategories: [],
  selectedCategory: null,

  setSubCategories: (data) => {
    set({ subCategories: data });
  },

  getCategories: async () => {
    try {
      const categories = await api.get("/categories");
      set({ categories: categories.data });
    } catch (error) {
      console.log(error);
    }
  },

  getCategoryById: async (categoryId) => {
    try {
      const selectedCategory = await api.get(`/categories/by-id/${categoryId}`);
      
      set({ selectedCategory: selectedCategory.data });
    } catch (error) {
      console.error(error);
    }
  },

  getParentCategories: async () => {
    try {
      const parentCategories = await api.get("/categories/parents");
      const formatted = parentCategories.data.map((cat) => ({
        label: cat.name,
        value: cat._id,
      }));
      set({ parentCategories: formatted });
    } catch (error) {
      console.error(error);
    }
  },

  getSubCategories: async (parentId) => {
    try {
      const subCategories = await api.get(
        `/categories/sub-categories/${parentId}`
      );
      const formatted = subCategories.data.map((cat) => ({
        label: cat.name,
        value: cat._id,
      }));

      set({ subCategories: formatted });
    } catch (error) {
      console.error(error);
    }
  },

  createCategory: async (data) => {
    try {
      set({ isCreatingCategory: true });
      await api.post("/categories/create", data);
      toast.success("Created category successfully");
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
      return false;
    } finally {
      set({ isCreatingCategory: false });
    }
  },

  updateCategoryById: async (updatedFields) => {
    try {
      set({ isUpdatingCategory: true });
      const updatedCategory = await api.patch(
        `/categories/update/${get().selectedCategory._id}`,
        updatedFields
      );
      set({ selectedCategory: null });
      toast.success("Updated category successfully");
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
      return false;
    } finally {
      set({ isUpdatingCategory: false });
    }
  },
}));
