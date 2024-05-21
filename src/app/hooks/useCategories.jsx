import React, { useContext, useEffect, useState } from 'react';
import productsService from '../services/products.service';
import { categoriesService } from '../services/products.service';

const CategoriesContext = React.createContext();

export const useCategories = () => {
  return useContext(CategoriesContext);
};

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getCat();
  }, []);

  async function getCat() {
    try {
      const { content } = await categoriesService.get();
      setCategories(content);
      setIsLoading(false);
      console.log(content);
    } catch (error) {}
  }
  return (
    <CategoriesContext.Provider value={{ categories }}>
      {!isLoading ? children : 'Loading...'}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
