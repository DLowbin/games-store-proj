import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const OrderInfo = ({ productId, orders }) => {
  const history = useHistory();
  const [{ order, count, payment, delivery, totalsumm, payload, user, timestamp }] = orders.filter(
    (order) => order.order === productId
  );
  const currentOrder = orders.filter((order) => order.order === productId);

  /* REVIEW: в константы */
  const statusList = [
    { value: 'neworder', name: 'Новый заказ', icon: 'fa-solid fa-circle-exclamation' },
    { value: 'pending', name: 'В обработке', icon: 'fa-regular fa-hourglass-half' },
    { value: 'fulfilled', name: 'Исполнен', icon: 'fa-regular fa-circle-check' },
    { value: 'cancelled', name: 'Отменен', icon: 'fa-solid fa-ban' },
  ];

  const getStatus = ([order]) => {
    const [status] = statusList.filter((stat) => stat.value === order.status);
    console.log(status);
    return status;
  };

  const columns = {
    name: { path: 'name', name: 'Наименование' },
    quantity: { path: 'quantity', name: 'Кол-во' },
    price: { path: 'price', name: 'Ст-ть' },
    id: { path: 'id', name: 'ID товара' },
  };

  const toggleDiv = (e) => {
    if (e.target.id === 'overlay') {
      history.goBack();
    }
  };

  return (
    <div onClick={(e) => toggleDiv(e)} id="overlay" className="overlay active">
      <div className="order-card">
        <h3>{`Заказ № : ${order}`}</h3>
        <div className="content">
          <div className="info">
            <h3>
              {`Клиент : ${user.name} `}
              <i className="fa-solid fa-address-card"></i>
            </h3>
            <span>{`Дата заказа : ${timestamp.date}`}</span>
            <span>{`Время заказа : ${timestamp.time}`}</span>
            <span>{`Контакты : ${user.email}`}</span>
            <span>{`Количество товаров : ${count}`}</span>
            <span>{`Стоимость : ${totalsumm}`}</span>
            <span>{`Способ оплаты : ${payment}`}</span>
            <span>{`Доставка : ${delivery}`}</span>
            <span>
              {`Статус заказа : ${getStatus(currentOrder).name} `}
              <i className={getStatus(currentOrder).icon}></i>
            </span>
          </div>
          <div className="payload active">
            <table className="admin-content-table orders">
              <thead>
                <tr>
                  {Object.keys(columns).map((column) => (
                    <th scope="col" key={column}>
                      {columns[column].name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payload.map((item) => (
                  <tr key={item.id} onClick={() => history.push(`/showcase/${item.id}/edit`)}>
                    {Object.keys(columns).map((column) => (
                      <td key={item.id + column}>{item[column]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
