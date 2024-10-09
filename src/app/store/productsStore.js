import { create } from 'zustand';

export const useItems = create((set) => ({
  items: [],
  setItems: (prods) =>
    // REVIEW: state не используется
    set((state) => {
      return { items: prods };
    }),
}));

export const useSearch = create((set) => ({
  searchQuery: '',
  setQuery: (query) =>
    // REVIEW: state не используется
    set((state) => {
      return { searchQuery: query };
    }),
}));
