import { create } from 'zustand';

export const useItems = create((set) => ({
  items: [],
  setItems: (prods) =>
    set((state) => {
      return { items: prods };
    }),
}));

export const useSearch = create((set) => ({
  searchQuery: '',
  setQuery: (query) =>
    set((state) => {
      return { searchQuery: query };
    }),
}));
