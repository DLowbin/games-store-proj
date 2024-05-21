// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useCart } from '../../store';
// import Search from './searchForm';

// function Header({ handleChange, handleClear, showCart, isUser, searchQuery, handleSearch }) {
//   const items = useCart((state) => state.cartItems);
//   const setDisplayCart = useCart((state) => state.setDisplayCart);
//   return (
//     <>
//       <header className="header">
//         <ul className="header__list">
//           <li className="header__item">
//             <div className="header__button">
//               <a name="ps-games" onClick={handleChange}>
//                 Игры PS5
//               </a>
//             </div>
//           </li>
//           <li className="header__item">
//             <div className="header__button xbox">
//               <a name="xb-games" onClick={handleChange}>
//                 Игры Xbox
//               </a>
//             </div>
//           </li>
//           <li className="header__item">
//             <div className="header__button">
//               <a name="ps5-accessories" onClick={handleChange}>
//                 Аксессуары PS5
//               </a>
//             </div>
//           </li>
//           <li className="header__item">
//             <div className="header__button xbox">
//               <a name="xb-accessories" onClick={handleChange}>
//                 Аксессуары Xbox
//               </a>
//             </div>
//           </li>
//           <li className="header__item">
//             <div className="header__button">
//               <a name="all-items" onClick={handleClear}>
//                 Все товары
//               </a>
//             </div>
//           </li>
//           <li className="header__item">
//             <div className="header__button">
//               <Link
//                 to={isUser ? '/double' : '/login/register'}
//                 onClick={isUser ? setDisplayCart : undefined}>
//                 {isUser ? (items.length > 0 ? `(${items.length}) Корзина` : 'Корзина') : 'Войти'}
//               </Link>
//             </div>
//           </li>
//         </ul>
//       </header>
//       <Search searchQuery={searchQuery} handleSearch={handleSearch} />
//     </>
//   );
// }

// export default Header;
