import React from 'react';
import Radiofield from './common/form/radioField';
import { useCart } from '../../store';

// const order = useCart((state)=>state.userOrder);
// const order = useCart((state) => state.userOrder);
const OrderCard = ({
  data,
  orderField,
  totalSumm,
  handleChange,
  onSubmit,
  onToggleCart,
  orderStatus,
  userOrder,
}) => {
  const cartItems = useCart((state) => state.cartItems);
  const totalQuantity = cartItems.reduce(
    (accumulator, currentItem) => accumulator + currentItem.quantity,
    0
  );
  const orderOptions = {
    payment: [
      { name: 'Банковской картой онлайн', value: 'Банковской картой онлайн' },
      { name: 'Картой при получении', value: 'Картой при получении' },
      { name: 'Наличными курьеру', value: 'Наличными курьеру' },
    ],
    delivery: [
      { name: 'Доставка', value: 'Доставка' },
      { name: 'Самовывоз', value: 'Самовывоз' },
    ],
  };
  // const paymentMethod = [
  //   { name: 'Банковской картой онлайн', value: 'Банковской картой онлайн' },
  //   { name: 'Картой при получении', value: 'Картой при получении' },
  //   { name: 'Наличными курьеру', value: 'Наличными курьеру' },
  // ];

  // REVIEW: большую часть верски можно разбить на кмпонены и параметризировать
  return (
    <div className={'order' + (orderField ? ' active' : '')}>
      <div className="order__card">
        <h3>{`ЗАКАЗ № `}</h3> <span className="order_num">{userOrder.order}</span>
        <h3>{`ВСЕГО ТОВАРОВ : ${totalQuantity}`}</h3>
        <h3>{`НА СУММУ : ${totalSumm} рублей`}</h3>
        {orderStatus === 'pending' ? (
          <>
            <fieldset>
              <legend>Выберите способ оплаты:</legend>
              <Radiofield
                options={orderOptions.payment}
                value={data.payment}
                name="payment"
                onChange={handleChange}
              />
            </fieldset>
            <div className="delivery_block">
              <fieldset name="delivery" className="delivery">
                <legend>Доставка:</legend>

                <Radiofield
                  options={orderOptions.delivery}
                  value={data.delivery}
                  name="delivery"
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset>
                <legend>{data.delivery === 'delivery' ? 'Доставка' : 'Самовывоз'}</legend>
                <div>
                  <h3>
                    {data.delivery === 'delivery'
                      ? 'Введите адрес доставки:'
                      : 'Выберите пункт выдачи:'}
                  </h3>
                </div>
                <div className="inputBox">
                  <input className="inputfield"></input>
                </div>
              </fieldset>
            </div>
            <div className="btn-container">
              <div role="button" className="card__button" onClick={onSubmit}>
                <span>ОФОРМИТЬ</span>
              </div>
              <div role="button" className="card__button" onClick={onToggleCart}>
                <span>В МАГАЗИН</span>
              </div>
            </div>
          </>
        ) : (
          <div className="order-success">
            <span>Заказ оформлен успешно!</span>
            <div role="button" className="card__button" onClick={onToggleCart}>
              <span>В МАГАЗИН</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
