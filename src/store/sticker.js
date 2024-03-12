import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

const useStickerStore = create(
  persist(
    (set) => ({
      stickers: [],
      addSticker: (sticker) =>
        set((state) => ({
          stickers: [...state.stickers, { ...sticker, id: nanoid(10) }],
        })),
      deleteSticker: (id) =>
        set((state) => ({
          stickers: state.stickers.filter((sticker) => sticker.id !== id),
        })),
    }),
    {
      name: "sticker-storage",
      getStorage: () => localStorage,
    },
  ),
);

export default useStickerStore;
