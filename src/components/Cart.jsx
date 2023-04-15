import React, { useState } from 'react';
import Counter from './itemsCounter';

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
          {items.map(
            (item) =>
              item.quantity > 0 && (
                <div className="cart__content" key={item.id}>
                  <img className="cart__img" src={item.image} alt="" />
                  <span>{item.name}</span>
                  {/* <button onClick={() => itemRemove(item.id)}> */}
                  <img
                    className="trash_img"
                    src="../images/trash-can-solid.svg"
                    onClick={() => itemRemove(item.id)}
                  ></img>
                  {/* </button> */}
                  <span>{item.quantity} x</span>
                  <p>{item.price}</p>
                  {/* <Counter count={item.quantity} /> */}
                  <button onClick={() => changeQuantity(item, '-')}>-</button>
                  <button onClick={() => changeQuantity(item, '+')}>+</button>
                </div>
              )
          )}
          <button onClick={displayCart}>CLOSE</button>
          <button onClick={clearCart}>CLEAR</button>
          <h3>{`ИТОГО : ${totalSumm(items)} руб.`}</h3>
        </div>
      </div>
    )
  );
}

export default Cart;
