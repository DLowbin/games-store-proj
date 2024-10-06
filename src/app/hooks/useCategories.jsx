import React, { useContext, useEffect, useState } from 'react';
import { categoriesService } from '../services/products.service';
import { useStateCategories } from '../store/categoryStore';

const CategoriesContext = React.createContext();

export const useCategories = () => {
  return useContext(CategoriesContext);
};

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // REVIEW: Опять же, чем отличается categories от StateCategories?
  // если нужны данные тут и в сторе, то почему бы не записать их в стор и не подписаться на их обновление?
  const setStateCategories = useStateCategories((state) => state.setCategories);
  useEffect(() => {
    getCat();
  }, []);

  async function getCat() {
    try {
      const { content } = await categoriesService.get();
      setStateCategories(content);
      setCategories(content);
      setIsLoading(false);
      // console.log(content);
    } catch (error) {}
  }
  return (
    <CategoriesContext.Provider value={{ categories }}>
      {!isLoading ? children : 'Loading...'}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
