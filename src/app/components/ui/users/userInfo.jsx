import React from 'react';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';

const UserInfo = ({ currentUserId, users }) => {
  const history = useHistory();
  const [{ id, email, isAdmin, name, orders }] = users.filter((user) => user.id === currentUserId);
  let us = users.filter((user) => user.id === currentUserId);
  console.log(us[0]);
  console.log(orders);
  const columns = {
    timestamp: { path: 'date', name: 'Дата' },
    orderId: { path: 'number', name: 'Номер' },
    summ: { path: 'summ', name: 'Стоимость' },
  };

  const getUserStatus = (status) => {
    return status ? 'Администратор' : 'Клиент';
  };

  const toggleDiv = (e) => {
    if (e.target.id === 'overlay') {
      history.goBack();
    }
  };

  return (
    <div onClick={(e) => toggleDiv(e)} id="overlay" className="overlay active">
      <div className="order-card">
        <h3>{`ID Клиента : ${currentUserId}`}</h3>
        <div className="content">
          <div className="info">
            <h3>
              {`Имя : ${name}`}
              {/* <i className="fa-solid fa-address-card"></i> */}
            </h3>
            <span>{`Контактные данные : ${email}`}</span>
            <span>{`Дата регистрации : `}</span>
            <span>{`Статус : ${getUserStatus(isAdmin)}`}</span>
            <span>{`Всего заказов : ${orders.length}`}</span>
            {/* <span>{`Стоимость : `}</span>
        <span>{`Способ оплаты : `}</span>
        <span>{`Доставка : `}</span> */}
            {/* <span>
        {`Статус заказа : ${getStatus(currentOrder).name} `}
        <i className={getStatus(currentOrder).icon}></i>
      </span> */}
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
              {orders && (
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.orderId}
                      onClick={() => history.push(`/admin/orders/${order.orderId}`)}>
                      {Object.keys(columns).map((column) => (
                        <td key={order.orderId + '_' + column}>{order[column]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
