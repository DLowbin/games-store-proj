import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../store';

function Header({ handleChange, handleClear, showCart, isUser }) {
  const items = useCart((state) => state.cartItems);
  return (
    <header className="header">
      <ul className="header__list">
        <li className="header__item">
          <div className="header__button">
            <a name="ps-games" onClick={handleChange}>
              Игры PS5
            </a>
          </div>
        </li>
        <li className="header__item">
          <div className="header__button xbox">
            <a name="xb-games" onClick={handleChange}>
              Игры Xbox
            </a>
          </div>
        </li>
        <li className="header__item">
          <div className="header__button">
            <a name="ps5-accessories" onClick={handleChange}>
              Аксессуары PS5
            </a>
          </div>
        </li>
        <li className="header__item">
          <div className="header__button xbox">
            <a name="xb-accessories" onClick={handleChange}>
              Аксессуары Xbox
            </a>
          </div>
        </li>
        <li className="header__item">
          <div className="header__button">
            <a name="all-items" onClick={handleClear}>
              Все товары
            </a>
          </div>
        </li>
        <li className="header__item">
          <div className="header__button">
            <Link to={isUser ? '' : '/login'} onClick={isUser ? showCart : undefined}>
              {isUser ? (items.length > 0 ? `(${items.length}) Корзина` : 'Корзина') : 'Войти'}
            </Link>
          </div>
        </li>
      </ul>
    </header>
  );
}

export default Header;
