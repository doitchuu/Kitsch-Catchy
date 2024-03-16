import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFilterStore = create(
  persist(
    (set) => ({
      filterStickers: [],
      addFilterSticker: (newFilterSticker) =>
        set((state) => ({
          filterStickers: [...state.filterStickers, newFilterSticker],
        })),
      updateFilterSticker: (id, updatedData) =>
        set((state) => ({
          filterStickers: state.filterStickers.map((filterSticker) =>
            filterSticker.id === id
              ? { ...filterSticker, ...updatedData }
              : filterSticker,
          ),
        })),
      deleteFilterSticker: (id) =>
        set((state) => ({
          filterStickers: state.filterStickers.filter(
            (sticker) => sticker.id !== id,
          ),
        })),
      clearAllStickers: () => set({ filterStickers: [] }),
    }),
    {
      name: "filter-storage",
      getStorage: () => localStorage,
    },
  ),
);

export default useFilterStore;
