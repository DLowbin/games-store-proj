import React, { useEffect, useState } from 'react';
import { useCart } from '../../../../store';
import { v4 } from 'uuid';
import httpService from '../../../services/http.service';
import { useItems } from '../../../store/productsStore';
import OrderCard from '../../orderCard';
import { useAuth } from '../../../hooks/useAuth';

import { useUsers } from '../../../store/usersStore';

const Cart = () => {
  const { currentUser, getUserData } = useAuth();

  const [testUsers, setTestUsers] = useState(currentUser.orders);
  console.log(testUsers);

  const currentUserState = useUsers((state) => state.currentUser);
  const setCurrentUserState = useUsers((state) => state.setCurrentUser);

  // useEffect(() => {
  //   setCurrentUser(currentUser);
  // }, []);
  console.log(currentUser);
  console.log(currentUserState);
  const [orderField, setOrderField] = useState(false);
  const [orderStatus, setOrderStatus] = useState('pending');

  const products = useItems((state) => state.items);

  const {
    items,
    removeCartItem,
    addCartItem,
    clearCart,
    changeItemQuantity,
    setDisplayCart,
    display,
    userOrder,
    setUserOrder,
  } = useCart((state) => ({
    items: state.cartItems,
    removeCartItem: state.removeCartItem,
    addCartItem: state.addCartItem,
    clearCart: state.clearCart,
    changeItemQuantity: state.changeItemQuantity,
    setDisplayCart: state.setDisplayCart,
    display: state.displayCart,
    userOrder: state.userOrder,
    setUserOrder: state.setUserOrder,
  }));

  // const items = useCart((state) => state.cartItems);
  // const removeCartItem = useCart((state) => state.removeCartItem);
  // const addCartItem = useCart((state) => state.addCartItem);
  // const clearCart = useCart((state) => state.clearCart);
  // const changeItemQuantity = useCart((state) => state.changeItemQuantity);
  // const setDisplayCart = useCart((state) => state.setDisplayCart);
  // const display = useCart((state) => state.displayCart);
  // const userOrder = useCart((state) => state.userOrder);
  // const setUserOrder = useCart((state) => state.setUserOrder);

  const [data, setData] = useState({
    order: '',
    count: items.length,
    payment: 'Банковской картой онлайн',
    delivery: 'Доставка',
    payload: '',
    totalsumm: 0,
  });

  let initialOrderSumm = 0;
  const totalSumm = items.reduce(
    (accumulator, currentValue) =>
      accumulator +
      (currentValue.discount
        ? currentValue.discountprice * currentValue.quantity
        : currentValue.initialprice * currentValue.quantity),
    initialOrderSumm
  );

  const toggleOrderField = () => {
    items.length > 0 && setOrderField((prevState) => !prevState);
    const orderNum = v4().split('-')[0];
    setUserOrder({
      user: currentUser,
      order: orderNum,
      payload: items,
      count: items.length,
      totalsumm: totalSumm,
    });
  };

  useEffect(() => {
    console.log(userOrder);
    console.log(data);
  }, [userOrder, data]);

  const toggleCart = () => {
    setOrderStatus('pending');
    setOrderField(false);
    setDisplayCart(false);
  };

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    setUserOrder({ [target.name]: target.value });
  };

  function getTimestamp(str) {
    let data = new Date(str);
    const corr = data.getTimezoneOffset() / 60;
    if (corr) {
      data = new Date(data.getTime() + corr);
    }

    function dateCorr(data) {
      if (data < 10) {
        return '0' + data;
      } else {
        return data;
      }
    }
    return {
      timestamp: data,
      date: data.getDate() + '.' + dateCorr(data.getMonth() + 1) + '.' + data.getFullYear(),
      time: data.getHours() + ':' + dateCorr(data.getMinutes()) + ':' + data.getSeconds(),
    };
  }

  async function addOrder(data) {
    let orderTimestamp = getTimestamp(Date.now());
    let pendingOrderNumber;

    if (currentUserState.id) {
      pendingOrderNumber = currentUserState.orders.length > 0 ? currentUserState.orders.length : 0;
      console.log(currentUserState.orders.length);
    }
    try {
      await httpService.put('orders/' + data.order, {
        ...data,
        timestamp: orderTimestamp,
      });
      await httpService.patch(`users/${currentUser.id}/orders/${pendingOrderNumber}`, {
        orderId: data.order,
        timestamp: orderTimestamp.date,
        summ: totalSumm,
      });
      console.log(currentUserState);
      console.log(testUsers);
      await getUserData();
    } catch (error) {}
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // setUserOrder({ timestamp: Date.now() });
    addOrder(userOrder);
    setOrderStatus('fulfilled');
    clearCart();
  };

  if (localStorage.getItem('games-store-cart')) {
    // console.log(JSON.parse(localStorage.getItem('games-store-cart')));
    let arr = JSON.parse(localStorage.getItem('games-store-cart'));
    for (let elem of arr) {
      let [item] = products.filter((prod) => prod.id === elem);
      // console.log(item);
      let check = items.filter((prod) => prod.id === item.id);
      if (!check.length > 0) {
        addCartItem(item);
      }
    }
  }

  return (
    <div className={'overlay' + (display ? ' active' : '')}>
      <OrderCard
        data={data}
        orderField={orderField}
        totalSumm={totalSumm}
        length={userOrder.count}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        onToggleCart={toggleCart}
        orderStatus={orderStatus}
        userOrder={userOrder}
      />
      <div className={'cart' + (display ? ' active' : '')}>
        <div className="cart__content">
          <div className="cart__total">
            <button className="close_img" onClick={toggleCart}></button>
          </div>

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
                      onClick={() => changeItemQuantity(item, 'increment')}></button>
                    <span>{item.quantity} x</span>
                    <button
                      className="button__counter minus"
                      onClick={() => changeItemQuantity(item, 'decrement')}></button>
                  </div>
                  <p>
                    {item.discount
                      ? item.discountprice * item.quantity
                      : item.initialprice * item.quantity}
                  </p>
                </div>
              )
              // )
            )
          ) : (
            <div className="cart__item">
              <h3>Корзина пуста</h3>
            </div>
          )}
        </div>
        <div className="cart__total">
          <div role="button" className="total">
            <h3>ИТОГО : {totalSumm} руб.</h3>
          </div>

          <div>
            {' '}
            <button className="trash_img" onClick={clearCart}></button>
          </div>

          <div
            role="button"
            className="card__button"
            onClick={items.length > 0 ? toggleOrderField : null}>
            <span>К ОФОРМЛЕНИЮ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
