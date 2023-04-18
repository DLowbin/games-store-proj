import React, { useState, useEffect } from 'react';

import Items from './Items';
import Pagination from './Pagination';
import itemsList from '../api/fakeApi.json';
import { paginate } from '../utils/paginate';
import Header from './Header';
import Login from './loginForm';
import Cart from './Cart';
import Search from './searchForm';
import Footer from './footer';

const Showcase = () => {
  const pageSize = 6;
  const [items, setItems] = useState(itemsList);
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [displayCart, setDisplayCart] = useState(false);
  const [totalPrice, setTotalprice] = useState(0);
  const [isUser, setIsUser] = useState(true);

  //-->временно
  const handleIsUser = () => {
    setIsUser((prev) => !prev);
  };
  //-->временно

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
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCurrentCategory({ name: event.target.name, content: event.target.textContent });
    setCurrentPage(1);
    setSearchQuery('');
  };

  const handleCategoryClear = () => {
    setCurrentCategory('');
    setSearchQuery('');
  };

  const checkDouble = (item) => {
    return cartItems.find((cartItem) => cartItem.id === item.id);
  };

  const handleCartAdd = (item) => {
    if (checkDouble(item)) {
      //почему не работает, если пытаться взять item.quantity, а не checkDouble(item) ?
      let currentQuantity = checkDouble(item).quantity;
      return setCartItems((prevState) =>
        prevState.map((cartitem) =>
          cartitem.id === item.id ? { ...cartitem, quantity: currentQuantity + 1 } : cartitem
        )
      );
    }
    //ПОЧЕМУ В setCartItems ПЕРЕДАЕМ ИМЕННО МАССИВ?
    setCartItems((prevState) => [...prevState, { ...item, quantity: 1 }]);
  };

  const handleItemsQuantity = (item, action) => {
    let currentQuantity = item.quantity;
    setCartItems((prevState) =>
      prevState.map((cartitem) =>
        cartitem.id === item.id
          ? { ...cartitem, quantity: action === '+' ? currentQuantity + 1 : currentQuantity - 1 }
          : cartitem
      )
    );
  };

  useEffect(() => {
    cartClean();
  }, [cartItems]);

  const cartClean = () => {
    let emptyItem = cartItems.find((cartItem) => cartItem.quantity === 0);
    if (emptyItem) {
      handleCartRemove(emptyItem.id);
    }
  };

  const handleCartRemove = (id) => {
    const filteredCart = cartItems.filter((item) => item.id !== id);
    setCartItems(filteredCart);
  };

  const itemsByCategory = searchQuery
    ? items.filter((item) => item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
    : currentCategory.name
    ? items.filter((item) => item.category === currentCategory.name)
    : items;

  const itemsCrop = paginate(itemsByCategory, currentPage, pageSize);
  let count = itemsByCategory.length;
  return (
    <>
      <Cart
        items={cartItems}
        displayCart={handleDisplayCart}
        display={displayCart}
        clearCart={handleClearCart}
        itemRemove={handleCartRemove}
        changeQuantity={handleItemsQuantity}
      />
      <Header
        handleChange={handleCategoryChange}
        handleClear={handleCategoryClear}
        showCart={handleDisplayCart}
        items={cartItems}
        isUser={isUser}
      />
      <button onClick={handleIsUser}>User/no user</button>
      <Search searchQuery={searchQuery} handleSearch={handleSearch} />
      <h2>
        {searchQuery
          ? `Результат поиска по запросу : ${searchQuery}`
          : currentCategory.content
          ? `${currentCategory.content}`
          : 'Все товары'}
      </h2>
      <Items items={itemsCrop} addItem={handleCartAdd} isUser={isUser} />
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
      <Footer />
    </>
  );
};

export default Showcase;
