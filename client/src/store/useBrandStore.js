import { create } from 'zustand';
import api from '../lib/axios';

export const useBrandStore = create((set, get) => ({
  brands: [],
  isLoading: false,
  
  getBrands: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/brands');
      set({ brands: response.data, isLoading: false });
    } catch (error) {
      console.error('Error fetching brands:', error);
      set({ isLoading: false });
    }
  },
}));