import React, { useState } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const OrdersTable = ({ columns, orders, statusList }) => {
  // const { orders } = useOrders();
  // // useOrders();
  // let pendingOrders;
  // let fulfilledOrders;
  // if (orders) {
  //   console.log(orders);
  //   pendingOrders = orders.filter((order) => order.status === 'pending');
  //   fulfilledOrders = orders.filter((order) => order.status !== 'pending');
  // }
  // const columns = {
  //   id: { path: 'id', name: 'Номер заказа' },
  // date: { path: 'date', name: 'Дата' },
  // user: { path: 'user', name: 'Клиент' },
  // price: { path: 'price', name: 'Стоимость' },
  // status: { path: 'status', name: 'Статус' },
  // payload: { name: 'Состав' },
  // };
  // const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  // const handleSort = (item) => {
  //   if (sortBy.path === item) {
  //     setSortBy((prevState) => ({
  //       ...prevState,
  //       order: sortBy.order === 'asc' ? 'desc' : 'asc',
  //     }));
  //   } else {
  //     setSortBy({ path: item, order: 'asc' });
  //   }
  // };
  // const renderIcon = (sortBy, currentPath) => {
  //   if (sortBy.path === currentPath) {
  //     return sortBy.order === 'asc' ? (
  //       <i className="fa-solid fa-caret-down"></i>
  //     ) : (
  //       <i className="fa-solid fa-caret-up"></i>
  //     );
  //   }
  //   return null;
  // };

  // const sortedOrders = _.orderBy(filteredProducts, [sortBy.path], [sortBy.order]);
  const history = useHistory();
  const [sortBy, setSortBy] = useState({ path: 'date', order: 'asc' });
  const sortedOrders = _.orderBy(orders, [sortBy.path], [sortBy.order]);

  const handleOrder = (orderId) => {
    history.push(`/admin/orders/${orderId}`);
  };

  const getStatusIcon = (order) => {
    const [status] = statusList.filter((stat) => stat.value === order.status);
    return status.icon;
  };

  const handleSort = (item) => {
    if (sortBy.path === item) {
      setSortBy((prevState) => ({
        ...prevState,
        order: sortBy.order === 'asc' ? 'desc' : 'asc',
      }));
    } else {
      setSortBy({ path: item, order: 'asc' });
    }
  };

  const renderIcon = (sortBy, currentPath) => {
    if (sortBy.path === currentPath) {
      return sortBy.order === 'asc' ? (
        <i className="fa-solid fa-caret-down"></i>
      ) : (
        <i className="fa-solid fa-caret-up"></i>
      );
    }
    return null;
  };

  return (
    <div className="orders-box">
      <table className="admin-content-table orders">
        <thead>
          <tr>
            {Object.keys(columns).map((val) => {
              return (
                <th
                  key={val}
                  scope="col"
                  onClick={columns[val].path ? () => handleSort(columns[val].path) : undefined}
                  {...{ role: columns[val].path && 'button' }}>
                  {`${columns[val].name}  `}
                  {renderIcon(sortBy, columns[val].path)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order) => (
            <tr
              onClick={() => handleOrder(order.order)}
              key={order.order}
              style={{ '--bg': order.status === 'pending' ? '#0fb7d1' : '#33c45f' }}>
              <td>{order.order}</td>
              <td>{order.timestamp.date}</td>
              <td>{order.timestamp.time}</td>
              <td>{order.user.name}</td>
              <td>
                <i className={getStatusIcon(order)}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
