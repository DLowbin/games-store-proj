// import { nanoid } from 'nanoid';

import { create } from 'zustand';
// import itemsList from './app/api/fakeApi.json';

// export const useItems = create((set) => ({
//   items: [],
//   setItems: (items) =>
//     set((state) => {
//       return { items: [items] };
//     }),
// }));

export const useIsUser = create((set) => ({
  isUser: false,
  setIsUser: () =>
    set((state) => {
      return { isUser: !state.isUser };
    }),
  isAdmin: false,
  setIsAdmin: () =>
    set((state) => {
      return { isAdmin: !state.isAdmin };
    }),
}));

export const useCart = create((set) => ({
  cartItems: [],
  displayCart: false,
  addCartItem: (item) =>
    set((state) => {
      localStorage.setItem('products', state.cartItems);
      return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
    }),
  setDisplayCart: () =>
    set((state) => {
      return { displayCart: !state.displayCart };
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
      // let emptyItem = filteredItems.find((cartItem) => cartItem.quantity === 0);
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
