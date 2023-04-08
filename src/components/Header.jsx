import React from 'react';

function Header({ handleChange }) {
  return (
    <header className="header">
      <a href="#" className="header__logo"></a>

      <nav className="header__nav">
        <ul className="header__list">
          <li className="header__item">
            <button name="ps-games" onClick={handleChange}>
              Игры PS5
            </button>
          </li>
          <li className="header__item">
            <button name="xb-games" onClick={handleChange}>
              Игры Xbox
            </button>
          </li>
          <li className="header__item">
            <button onClick={handleChange}>Аксессуары PS5 </button>
          </li>
          <li className="header__item">
            <button onClick={handleChange}>Аксессуары Xbox</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
