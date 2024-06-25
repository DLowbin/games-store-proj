import { create } from 'zustand';

export const useCurrentCat = create((set) => ({
  category: {
    order: 1,
    id: 'edbd1a337fbc4e4aa8a5f3be507b2661',
    name: 'all',
    rus: 'Все товары',
    icon: 'fa-solid fa-shop',
    color: '#0fb7d1',
  },
  categories: [],
  setItems: (current) =>
    set((state) => {
      return { category: current };
    }),
}));

export const useStateCategories = create((set) => ({
  categories: [],
  setCategories: (cat) =>
    set(() => {
      return { categories: cat };
    }),
}));
