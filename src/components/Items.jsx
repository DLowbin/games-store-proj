import React from 'react';
import { Link } from 'react-router-dom';

function Items({ items, addItem, isUser }) {
  return (
    <div className="container">
      {items.map((item) => (
        <div className="card" key={item.id}>
          <div className="content">
            <img src={item.image} alt="" className="game__img" />
            <h4>{item.name}</h4>
            <p>{item.price}</p>
            <a
              onClick={() => {
                // addItem(item.name);
                addItem(item);
                // console.log(item);
              }}
            >
              {isUser ? 'В корзину' : <Link to={'/login'}>Регистрация</Link>}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Items;
