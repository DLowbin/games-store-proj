import React from 'react';

let price = 0;

function Cart({ items, display, displayCart, clearCart }) {
  // console.log(items.length);
  for (let i = 0; i < items.length; i++) {
    // let cost = 0;
    // price += items.price;
    console.log(items.price);
  }
  return (
    display && (
      <div className="overlay">
        <div className="cart">
          {items.map((item) => (
            <div key={item.id}>
              <p>{item.price}</p>
              {/* <div className="content">
            <img src={item.image} alt="" className="game__img" />
            <h4>{item.name}</h4>
            <p>{item.price}</p>
            <p>Purchase</p>
          </div> */}
              {item}
            </div>
          ))}

          <button onClick={displayCart}>CLOSE</button>
          <button onClick={clearCart}>CLEAR</button>
          <p>
            <h4>ИТОГО :</h4>
          </p>
        </div>
      </div>
    )
  );
}

export default Cart;
