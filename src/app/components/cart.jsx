import React, { useState } from 'react';
import { useCart } from '../../store';

function Cart({
  /*items,*/ /*clearCart,*/ /*display,
  /*displayCart, /*itemRemove,*/ changeQuantity,
}) {
  const items = useCart((state) => state.cartItems);
  const removeCartItem = useCart((state) => state.removeCartItem);
  const clearCart = useCart((state) => state.clearCart);
  const changeItemQuantity = useCart((state) => state.changeItemQuantity);
  const setDisplayCart = useCart((state) => state.setDisplayCart);
  const display = useCart((state) => state.displayCart);
  // const displayCart = useCart((state) => state.displayCart);
  let initialValue = 0;
  const [orderField, setOrderField] = useState(false);
  const toggleOrderField = () => {
    items.length > 0 && setOrderField((prevState) => !prevState);
  };
  const toggleCart = () => {
    setOrderField(false);
    setDisplayCart();
  };
  let testArr = [
    { name: 'NameOne', age: 12 },
    { name: 'NameTwo', age: 12 },
    { name: 'NameThree', age: 12 },
    { name: 'NameThree', age: 12 },
  ];

  const setArr = new Set(testArr.map((obj) => obj.name));
  console.log(setArr);

  const totalSumm = (items) => {
    return items.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity,
      initialValue
    );
  };
  return (
    // display &&
    <div className={'overlay' + (display ? ' active' : '')}>
      <div className={'order' + (orderField ? ' active' : '')}>
        <h1>ЗАКАЗ №</h1>
        <h3>ВСЕГО ТОВАРОВ</h3>
        <h3>НА СУММУ </h3>
        <h2>PAYMENT TYPE:</h2>
        <fieldset>
          <legend>Выберите способ оплаты:</legend>

          <div>
            <input type="radio" id="huey" name="drone" value="huey" />
            <label htmlFor="huey">Банковской картой онлайн</label>
          </div>

          <div>
            <input type="radio" id="dewey" name="drone" value="dewey" />
            <label htmlFor="dewey">Картой при получении</label>
          </div>

          <div>
            <input type="radio" id="louie" name="drone" value="louie" />
            <label htmlFor="louie">Наличными курьеру</label>
          </div>
        </fieldset>
      </div>
      <div className={'cart' + (display ? ' active' : '')}>
        <div className="cart__content">
          <button className="close_img" onClick={toggleCart}></button>
          {items.length > 0 ? (
            items.map(
              (item) => (
                // item.quantity > 0 && (
                <div className="cart__item" key={item.id}>
                  <img className="cart__img" src={item.image} alt="" />
                  <span className="item_name">{item.name}</span>
                  <button className="trash_img" onClick={() => removeCartItem(item.id)}></button>
                  <div className="quantity__block">
                    <button
                      className="button__counter plus"
                      onClick={() => changeItemQuantity(item, '+')}></button>
                    <span>{item.quantity} x</span>
                    <button
                      className="button__counter minus"
                      onClick={() => changeItemQuantity(item, '-')}></button>
                  </div>
                  <p>{item.price * item.quantity}</p>
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
          <div role="button" className="card__button" onClick={toggleOrderField}>
            <span>ОФОРМИТЬ ЗАКАЗ</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
