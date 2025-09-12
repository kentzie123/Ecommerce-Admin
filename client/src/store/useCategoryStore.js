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
  subSubCategories: [],
  selectedCategory: null,

  setSubSubCategories: (data) => {
    set({ subSubCategories: data });
  },

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

  getSubSubCategories: async (parentId) => {
    try {
      const subSubCategories = await api.get(
        `/categories/sub-sub-categories/${parentId}`
      );
      const formatted = subSubCategories.data.map((cat) => ({
        label: cat.name,
        value: cat._id,
      }));
      set({ subSubCategories: formatted });
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

  // // Add these methods to your existing category store
  // getSubCategories: async (parentId) => {
  //   set({ isLoading: true });
  //   try {
  //     const response = await api.get(`/categories/${parentId}/subcategories`);
  //     set({ subCategories: response.data, isLoading: false });
  //   } catch (error) {
  //     console.error("Error fetching subcategories:", error);
  //     set({ isLoading: false });
  //   }
  // },

  // getSubSubCategories: async (parentId) => {
  //   set({ isLoading: true });
  //   try {
  //     const response = await api.get(`/categories/${parentId}/subcategories`);
  //     set({ subSubCategories: response.data, isLoading: false });
  //   } catch (error) {
  //     console.error("Error fetching sub-subcategories:", error);
  //     set({ isLoading: false });
  //   }
  // },
}));
