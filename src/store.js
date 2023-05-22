// import { nanoid } from 'nanoid';
//почему не работает без деструктуризации?
import { create } from 'zustand';
import itemsList from './api/fakeApi.json';

export const useItems = create((set) => ({
  items: itemsList,
}));

export const useCart = create((set) => ({
  cartItems: [],
  addCartItem: (item) =>
    set((state) => {
      return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
    }),
  addDoubledItem: (items) =>
    set(() => {
      return { cartItems: items };
    }),
  changeItemQuantity: (item, action) =>
    set((state) => {
      let currentQuantity = item.quantity;
      const filteredItems = state.cartItems.map((cartitem) =>
        cartitem.id === item.id
          ? { ...cartitem, quantity: action === '+' ? currentQuantity + 1 : currentQuantity - 1 }
          : cartitem
      );
      let emptyItem = filteredItems.find((cartItem) => cartItem.quantity === 0);
      return { cartItems: filteredItems };
    }),
  removeCartItem: (id) =>
    set((state) => {
      const filteredItems = state.cartItems.filter((item) => item.id !== id);
      return { cartItems: filteredItems };
    }),
  clearCart: () =>
    set(() => {
      return { cartItems: [] };
    }),
  removeEmpty: (id) =>
    set((state) => {
      let emptyItem = state.cartItems.find((cartItem) => cartItem.quantity === 0);
      if (emptyItem) {
        return state.removeCartItem(emptyItem.id);
      }
    }),
}));
