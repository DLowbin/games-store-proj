import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const Admin = () => {
  return (
    <div className="box">
      <button>
        <Link to={'/admin/addproduct'}>ADD</Link>
      </button>
      <button>
        <Link to={'/admin/products'}>TABLE</Link>
      </button>
    </div>
  );
};

export default Admin;
