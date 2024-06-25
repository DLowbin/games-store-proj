import React, { useContext, useEffect, useState } from 'react';
import productsService from '../services/products.service';
import Loader from '../components/common/loader';
import { useItems } from '../store/productsStore';

const ProductContext = React.createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  // const products = useItems((state) => state.items);
  // const setProducts = useItems((state) => state.setItems);
  const [isLoading, setIsLoading] = useState(true);
  const setCurItems = useItems((state) => state.setItems);
  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const { content } = await productsService.get();
      // setProducts(content);
      setCurItems(content);
      setIsLoading(false);
    } catch (error) {}
  }
  return (
    <ProductContext.Provider value={{ products, getProducts }}>
      {!isLoading ? children : <Loader />}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
