import { create } from 'zustand';

export const useUsers = create((set) => ({
  currentUser: undefined,
  setCurrentUser: (user) =>
    set((state) => {
      return { currentUser: user };
    }),
}));
