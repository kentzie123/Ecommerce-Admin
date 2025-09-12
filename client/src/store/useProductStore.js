import { create } from "zustand";

// axios api
import api from "../lib/axios";

export const useProductStore = create((set, get) => ({
  products: [],

  getProducts: async () => {
    try {
      const products = await api.get("/products");
      set({ products: products.data });
    } catch (error) {
      console.error(error);
    }
  },
}));
