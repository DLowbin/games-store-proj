import React, { useEffect } from 'react';
import { useCart } from '../../store';
import Product from './product';
import Loader from './common/loader';

function Items({ items, isUser }) {
  const addItem = useCart((state) => state.addCartItem);

  const cartItems = useCart((state) => state.cartItems);
  const addDoubledItem = useCart((state) => state.addDoubledItem);

  const checkDouble = (item) => {
    return cartItems.length > 0 && cartItems.find((cartItem) => cartItem.id === item.id);
  };

  useEffect(() => {
    // REVIEW: вообще непонятно зачем что то читаь из ЛС, и потом записать туда снова в другом виде?
    // в этом случае лучше нормализовать данные или сделать селектор
    localStorage.setItem('games-store-cart', JSON.stringify(cartItems.map((el) => el.id)));
    // REVIEW: Опять же подписка на данные, см случай в loginFormNO
  }, [cartItems]);

  const handleAddToCart = (item) => {
    if (checkDouble(item)) {
      let currentQuantity = checkDouble(item).quantity;
      const newCartItems = cartItems.map((cartitem) =>
        cartitem.id === item.id ? { ...cartitem, quantity: currentQuantity + 1 } : cartitem
      );
      return addDoubledItem(newCartItems);
    }
    addItem(item);
  };

  return (
    <div className="container">
      {items.length > 0 ? (
        <Product items={items} isUser={isUser} handleAddToCart={handleAddToCart} />
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Items;
