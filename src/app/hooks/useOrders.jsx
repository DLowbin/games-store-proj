import React, { useContext, useEffect, useState } from 'react';
import ordersService from '../services/orders.service';
import Loader from '../components/common/loader';

const OrdersContext = React.createContext();

export const useOrders = () => {
  return useContext(OrdersContext);
};

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  // const products = useItems((state) => state.items);
  // const setProducts = useItems((state) => state.setItems);
  const [isLoading, setIsLoading] = useState(true);
  // const setCurItems = useItems((state) => state.setItems);
  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    try {
      const { content } = await ordersService.get();
      console.log(content);
      setOrders(content);
      // setCurItems(content);
      setIsLoading(false);
    } catch (error) {}
  }
  return (
    <OrdersContext.Provider value={{ orders }}>
      {!isLoading ? children : <Loader />}
    </OrdersContext.Provider>
  );
};

export default OrderProvider;
