import { create } from 'zustand';

export const useItems = create((set) => ({
  items: [],
  setItems: (itm) =>
    set((state) => {
      return { items: itm };
    }),
}));

export const useSearch = create((set) => ({
  searchQuery: '',
  setQuery: (query) =>
    set((state) => {
      return { searchQuery: query };
    }),
}));
