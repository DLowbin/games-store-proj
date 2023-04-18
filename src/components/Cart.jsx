import React, { useState } from 'react';
import Minus from '../images/minus-solid.svg';

function Cart({ items, display, displayCart, clearCart, itemRemove, changeQuantity }) {
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
            {items.map(
              (item) =>
                item.quantity > 0 && (
                  <div className="cart__item" key={item.id}>
                    <img
                      className="cart__img"
                      src={require(`../images/${item.category}/${item.image}`)}
                      alt=""
                    />
                    <span>{item.name}</span>
                    <button className="trash_img" onClick={() => itemRemove(item.id)}></button>
                    <div className="quantity__block">
                      <button
                        className="button__counter plus"
                        onClick={() => changeQuantity(item, '+')}
                      ></button>
                      <span>{item.quantity} x</span>
                      <button
                        className="button__counter minus"
                        onClick={() => changeQuantity(item, '-')}
                      ></button>
                    </div>

                    <p>{item.price}</p>
                  </div>
                )
            )}
          </div>
          <div>
            <button onClick={displayCart}>CLOSE</button>
            <button onClick={clearCart}>CLEAR</button>
            <h3>{`ИТОГО : ${totalSumm(items)} руб.`}</h3>
          </div>
        </div>
      </div>
    )
  );
}

export default Cart;
