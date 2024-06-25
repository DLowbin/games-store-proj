import React from 'react';
import { useParams } from 'react-router-dom';
import ProductTable from '../components/ui/admin/productTable';
import AdminPannel from '../components/ui/admin/adminPannel';
import Orders from '../components/ui/admin/orders';
import Users from '../components/ui/admin/users';
import AddProduct from '../components/ui/admin/addProduct';

const Admin = () => {
  const params = useParams();
  const { option, parameter } = params;
  function renderSwitch(option) {
    switch (option) {
      case 'products':
        return <ProductTable />;
      case 'addproduct':
        return <AddProduct />;
      case 'users':
        return <Users currentUserId={parameter} />;
      case 'orders':
        return <Orders currentOrderId={parameter} />;
      default:
        return;
    }
  }
  return (
    <div className="box">
      <AdminPannel />
      <div className="adm-content">{renderSwitch(option)}</div>
    </div>
  );
};

export default Admin;
