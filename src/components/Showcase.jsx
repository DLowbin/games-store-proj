import React, { useState, useEffect } from 'react';
import Items from './Items';
import Pagination from './Pagination';
import itemsList from '../api/fakeApi.json';
import { paginate } from '../utils/paginate';
import Header from './Header';
import Login from './loginForm';
import Cart from './Cart';

const Showcase = () => {
  const count = itemsList.length;
  const pageSize = 6;
  const [items, setItems] = useState(itemsList);
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [displayCart, setDisplayCart] = useState(false);

  useEffect(() => {
    console.log(items);
  }, [items]);

  useEffect(() => {
    console.log(displayCart);
  }, [displayCart]);

  const handleDisplayCart = () => {
    setDisplayCart((prevState) => !prevState);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handlePageChange = (pageIndex) => {
    console.log('page ', pageIndex);
    setCurrentPage(pageIndex);
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCurrentCategory(event.target.name);
  };

  const handleCategoryClear = () => {
    setCurrentCategory('');
  };

  const handleCartAdd = (item) => {
    //ПОЧЕМУ В setCartItems ПЕРЕДАЕМ ИМЕННО МАССИВ?
    setCartItems([...cartItems, item]);
    // console.log(cartItems);
  };

  const itemsByCategory = searchValue
    ? items.filter((item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
    : currentCategory
    ? items.filter((item) => item.category === currentCategory)
    : items;

  const itemsCrop = paginate(itemsByCategory, currentPage, pageSize);

  return (
    <>
      <div className="form">
        <button className="form__button">
          <img
            src="../../public/images/icons8-search-50.svg"
            alt=""
            className="form__search-icon"
          />
        </button>
        <input
          type="search"
          className="form__input"
          placeholder="Find a game"
          onChange={handleSearch}
        />
      </div>
      <h2>{!currentCategory ? 'Все товары' : `${currentCategory}`}</h2>
      <Cart
        items={cartItems}
        displayCart={handleDisplayCart}
        display={displayCart}
        clearCart={handleClearCart}
      />
      <Header
        handleChange={handleCategoryChange}
        handleClear={handleCategoryClear}
        showCart={handleDisplayCart}
      />
      <Login />
      <Items items={itemsCrop} addItem={handleCartAdd} />
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
};

export default Showcase;
