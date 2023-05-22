import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../store';

function Items({ items, isUser }) {
  const addItem = useCart((state) => state.addCartItem);
  const cartItems = useCart((state) => state.cartItems);
  const addDoubledItem = useCart((state) => state.addDoubledItem);

  // const handleCartAdd = (item) => {
  //   if (checkDouble(item)) {
  //     let currentQuantity = checkDouble(item).quantity;
  //     return setCartItems((prevState) =>
  //       prevState.map((cartitem) =>
  //         cartitem.id === item.id ? { ...cartitem, quantity: currentQuantity + 1 } : cartitem
  //       )
  //     );
  //   }
  //   //ПОЧЕМУ В setCartItems ПЕРЕДАЕМ ИМЕННО МАССИВ?
  //   setCartItems((prevState) => [...prevState, { ...item, quantity: 1 }]);
  // };

  const checkDouble = (item) => {
    return cartItems.length > 0 && cartItems.find((cartItem) => cartItem.id === item.id);
  };

  const handleAddToCart = (item) => {
    if (checkDouble(item)) {
      let currentQuantity = checkDouble(item).quantity;
      const newCartItems = cartItems.map((cartitem) =>
        cartitem.id === item.id ? { ...cartitem, quantity: currentQuantity + 1 } : cartitem
      );
      return addDoubledItem(newCartItems);
    }
    return addItem(item);
  };

  return (
    <div className="container">
      {items.map((item) => (
        <div className="card" key={item.id}>
          <div className="content">
            <img
              src={require(`../images/${item.category}/${item.image}`)}
              alt=""
              className="game__img"
            />
            <h4>{item.name}</h4>
            <p>{item.price}</p>
            <button
              onClick={() => {
                handleAddToCart(item);
              }}
            >
              {isUser ? 'В корзину' : <Link to={'/login'}>Регистрация</Link>}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Items;
