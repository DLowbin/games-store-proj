import { create } from 'zustand';
import { useAuth } from './app/hooks/useAuth';

// const { jhg } = useAuth();
export const useTestStore = create((set) => ({
  testUser: '',
  setTestUser: () =>
    set((state) => {
      const { currentUser } = useAuth();
      return { testUser: currentUser };
    }),
}));
