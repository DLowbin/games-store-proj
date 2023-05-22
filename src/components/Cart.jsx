import React from 'react';
import { useCart } from '../store';

function Cart({ /*items,*/ /*clearCart,*/ display, displayCart, /*itemRemove,*/ changeQuantity }) {
  const items = useCart((state) => state.cartItems);
  const removeCartItem = useCart((state) => state.removeCartItem);
  const clearCart = useCart((state) => state.clearCart);
  const changeItemQuantity = useCart((state) => state.changeItemQuantity);
  let initialValue = 0;

  const totalSumm = (items) => {
    return items.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity,
      initialValue
    );
  };
  return (
    display && (
      <div className="overlay">
        <div className="cart">
          <div className="cart__content">
            <button className="close_img" onClick={displayCart}></button>
            {items.length > 0 ? (
              items.map(
                (item) => (
                  // item.quantity > 0 && (
                  <div className="cart__item" key={item.id}>
                    <img
                      className="cart__img"
                      src={require(`../images/${item.category}/${item.image}`)}
                      alt=""
                    />
                    <span>{item.name}</span>
                    <button className="trash_img" onClick={() => removeCartItem(item.id)}></button>
                    <div className="quantity__block">
                      <button
                        className="button__counter plus"
                        onClick={() => changeItemQuantity(item, '+')}
                      ></button>
                      <span>{item.quantity} x</span>
                      <button
                        className="button__counter minus"
                        onClick={() => changeItemQuantity(item, '-')}
                      ></button>
                    </div>
                    <p>{item.price}</p>
                  </div>
                )
                // )
              )
            ) : (
              <div className="cart__item">Корзина пуста</div>
            )}
          </div>
          <div className="cart__total">
            <h3>ИТОГО : {totalSumm(items)} руб.</h3>
            <button className="trash_img" onClick={clearCart}></button>
          </div>
        </div>
      </div>
    )
  );
}

export default Cart;
