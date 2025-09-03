import { create } from "zustand";

// api
import api from "../lib/axios";

// toast
import toast from "react-hot-toast";

export const useCategoryStore = create((set, get) => ({
  isCreatingCategory: false,
  categories: [],
  parentCategories: [],
  subCategories: [],

  setSubCategories: (data) => {
    set({subCategories: data});
  },

  getCategories: async () => {
    try {
      const categories = await api.get("/categories");
      set({ categories: categories.data });
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.log(formatted);
      
      set({ subCategories: formatted });
    } catch (error) {
      console.log(error);
    }
  },

  createCategory: async (data) => {
    try {
      set({ isCreatingCategory: true });
      await api.post("/categories/create", data);
      toast.success("Created category successfully");
      return true;
    } catch (error) {
      console.log(error);
      toast.error("sample error");
      return false;
    } finally {
      set({ isCreatingCategory: false });
    }
  },
}));
