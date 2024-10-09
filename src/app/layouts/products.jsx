import React from 'react';
import { useParams } from 'react-router-dom';
import EditProduct from '../components/page/productsListPage/editProductPage';
import ProductsListPage from '../components/page/productsListPage/productsListPage';

const Products = () => {
  const params = useParams();
  const { productId, edit } = params;
  // REVIEW: вложеные тернарники это очень плохо. что бы такого не было, нужно завести стейт машину, в которую будут вынесены
  // все состояния и переходы, а на слой рендера будет передоваться только нужный экран
  return <>{productId ? edit ? <EditProduct /> : <ProductsListPage /> : <ProductsListPage />}</>;
};

export default Products;
