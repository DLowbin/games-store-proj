import { create } from 'zustand';
import { createSelectors } from './app/store/createSelectors';

export const useCart = create((set) => ({
  cartItems: [],
  displayCart: false,
  addCartItem: (item) =>
    set((state) => {
      // localStorage.setItem('products', state.cartItems);
      // state.setUserOrder({ count: state.cartItems.length });
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
          ? {
              ...cartitem,
              quantity:
                action === 'increment'
                  ? currentQuantity + 1
                  : currentQuantity > 0
                  ? currentQuantity - 1
                  : currentQuantity,
            }
          : cartitem
      );
      // let emptyItem = filteredItems.find((cartItem) => cartItem.quantity === 0);
      // state.setUserOrder({ count: filteredItems.length });
      // console.log(filteredItems.length);
      return { cartItems: filteredItems };
    }),
  removeCartItem: (id) =>
    set((state) => {
      const filteredItems = state.cartItems.filter((item) => item.id !== id);
      localStorage.setItem('games-store-cart', JSON.stringify(filteredItems.map((el) => el.id)));
      state.setUserOrder({ count: state.cartItems.length - 1 });
      return { cartItems: filteredItems };
    }),
  clearCart: () =>
    set((state) => {
      localStorage.removeItem('games-store-cart');
      state.setUserOrder({ count: 0 });
      return { cartItems: [] };
    }),
  removeEmpty: (id) =>
    set((state) => {
      let emptyItem = state.cartItems.find((cartItem) => cartItem.quantity === 0);
      if (emptyItem) {
        return state.removeCartItem(emptyItem.id);
      }
    }),
  userOrder: {
    order: '',
    count: '',
    payment: 'Банковской картой онлайн',
    delivery: 'Доставка',
    payload: '',
    status: 'pending',
    timestamp: '',
  },
  setUserOrder: (data) =>
    set((state) => {
      return { userOrder: { ...state.userOrder, ...data } };
    }),
}));

export const useStoreSelectors = createSelectors(useCart);
