import React, { useState } from 'react';
import { useOrders } from '../../../hooks/useOrders';
import OrdersTable from '../orders/ordersTable';
import OrderInfo from '../orders/orderInfo';
import Loader from '../../common/loader';
import TableSearch from '../tableSearch';
import { search } from '../../../utils/search';

const Orders = ({ currentOrderId }) => {
  const { orders } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState(undefined);

  const columns = {
    order: { path: 'order', name: 'Номер заказа' },
    date: { path: 'timestamp.date', name: 'Дата' },
    time: { path: 'timestamp.time', name: 'Время' },
    client: { path: 'user.name', name: 'Клиент' },
    satus: { path: 'status', name: 'Статус' },
  };

  const statusList = [
    { value: 'neworder', name: 'Новый заказ', icon: 'fa-solid fa-circle-exclamation' },
    { value: 'pending', name: 'В обработке', icon: 'fa-regular fa-hourglass-half' },
    { value: 'fulfilled', name: 'Исполнен', icon: 'fa-regular fa-circle-check' },
    { value: 'cancelled', name: 'Отменен', icon: 'fa-solid fa-ban' },
  ];

  const handleSearch = ({ value }) => {
    setSearchQuery(value);
    console.log(value);
  };

  const handleClearForm = () => {
    setSearchQuery('');
  };

  const setFilter = (event, filter) => {
    console.log(event.target.id);
    handleClearForm();
    setCurrentFilter(filter);
  };
  const filteredOrders = (orders) => {
    return orders.filter((order) => order.status === currentFilter);
  };

  return (
    <>
      <TableSearch
        handleSearch={handleSearch}
        handleClearForm={handleClearForm}
        query={searchQuery}
        setFilter={setFilter}
        currentFilter={currentFilter}
        searchCriteria={statusList}
      />
      <div className="orders-box">
        {orders ? (
          <>
            <OrdersTable
              columns={columns}
              statusList={statusList}
              // orders={
              //   currentFilter ? filteredOrders(search(orders, ['order'], searchQuery)) : orders
              // }
              orders={
                currentFilter
                  ? filteredOrders(search(orders, ['order'], searchQuery))
                  : search(orders, ['order'], searchQuery)
              }
            />
            {currentOrderId && (
              <OrderInfo productId={currentOrderId} orders={orders} statusList={statusList} />
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );

  //   <tbody>
  //     {orders ? (
  //       sortedProducts.map((prod) => (
  //         <tr key={prod.id}>
  //           <td width={100}>
  //             <img
  //               src={prod.image}
  //               style={{ height: '80px', width: '60px' }}
  //               // className="cart__img"
  //               alt=""
  //             />
  //           </td>
  //           <td>{prod.name}</td>
  //           <td>
  //             {/* <SelectField options={catPic} /> */}
  //             {getCategory(prod.category)}
  //           </td>
  //           <td>{prod.id}</td>
  //           <td>
  //             {prod.price}
  //             {/* <TextField
  //           label={prod.price}
  //           // value={data.price}
  //           // onChange={handleChange}
  //           name="price"
  //         /> */}
  //           </td>
  //           <td>
  //             <button className="btn-save" onClick={() => console.log(prod.id)}>
  //               {' '}
  //               <Link to={`/showcase/${prod.id}/edit`}>
  //                 {' '}
  //                 <i className="fa-solid fa-gears"></i>
  //               </Link>
  //             </button>
  //             <button
  //               className="btn-delete"
  //               // onClick={() => console.log(prod.id)}
  //               onClick={(e) => deleteProd(e, prod.id)}>
  //               {' '}
  //               <i className="fa-solid fa-trash-can"></i>
  //             </button>
  //           </td>
  //         </tr>
  //       ))
  //     ) : (
  //       <Loader />
  //     )}
  //   </tbody>
  // </table>
};

export default Orders;
