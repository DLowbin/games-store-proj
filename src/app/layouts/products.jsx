import React from 'react';
import { useParams } from 'react-router-dom';
import EditProduct from '../components/page/productsListPage/editProductPage';
import ProductsListPage from '../components/page/productsListPage/productsListPage';

const Products = () => {
  const params = useParams();
  const { productId, edit } = params;
  return <>{productId ? edit ? <EditProduct /> : <ProductsListPage /> : <ProductsListPage />}</>;
};

export default Products;
