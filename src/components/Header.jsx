import React from 'react';

function Header({ handleChange, handleClear, showCart }) {
  return (
    <header className="header">
      {/* <a href="#" className="header__logo"></a> */}

      {/* <nav className="header__nav"> */}
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
            <a name="all-items" onClick={showCart}>
              Корзина
            </a>
          </div>
        </li>
      </ul>
      {/* </nav> */}
    </header>
  );
}

export default Header;
