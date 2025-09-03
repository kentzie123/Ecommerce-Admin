import { create } from "zustand";

export const useSidebarStore = create((set, get) => ({
  sidebarOpen: true,

  setToggleSidebar: () => {
    set({sidebarOpen: !get().sidebarOpen});
  }
}));
