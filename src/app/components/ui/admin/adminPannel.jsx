import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const AdminPannel = () => {
  const params = useParams();
  const { option } = params;
  const [light, setLight] = useState(false);
  const adminOptions = {
    addproduct: {
      option: 'addproduct',
      rus: 'Добавить товар',
      link: 'addproduct',
      icon: 'fa-solid fa-circle-plus',
    },
    products: {
      option: 'products',
      rus: 'Все товары',
      link: 'products',
      icon: 'fa-solid fa-table-list',
    },
    users: {
      option: 'users',
      rus: 'Клиенты',
      link: 'users',
      icon: 'fa-regular fa-user',
    },
    orders: {
      option: 'orders',
      rus: 'Заказы',
      link: 'orders',
      icon: 'fa-solid fa-bell-concierge',
    },
  };

  return (
    <>
      {/* <div className="box"> */}
      <div className={`cat_pan-button admin` + (light ? ' glow' : '')}>
        <span>{!option ? 'Панель управления' : adminOptions[option].rus}</span>
      </div>
      <i
        className={`fa-solid fa-power-off` + (light ? ' active' : '')}
        onClick={() => setLight(!light)}></i>
      <div className={'admin-buttons' + (option ? ' active' : '')}>
        {Object.keys(adminOptions).map((option) => (
          <div key={option} className="admin-button">
            <span>
              <Link to={`/admin/${adminOptions[option].link}`}>
                <i className={adminOptions[option].icon}></i>
              </Link>
            </span>
          </div>
        ))}
      </div>
      {/* </div> */}
    </>
  );
};

export default AdminPannel;
