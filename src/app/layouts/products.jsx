import React from 'react';
import { useParams } from 'react-router-dom';
import EditProduct from '../components/page/productsListPage/editProductPage';
import ProductsListPage from '../components/page/productsListPage/productsListPage';
// import UserPage from '../components/page/userPage';
// import UsersListPage from '../components/page/usersListPage';
// import EditUserPage from '../components/page/editUserPage/EditUserPage';
// import UserProvider from '../hooks/useUsers';

const Products = () => {
  const params = useParams();
  const { productId, edit } = params;
  return <>{productId ? edit ? <EditProduct /> : <ProductsListPage /> : <ProductsListPage />}</>;
};

export default Products;
