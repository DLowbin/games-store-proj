import React, { useState } from 'react';

import Items from './Items';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import Header from './header';
import Cart from './cart';
import Search from './searchForm';
import Footer from './footer';
import { useItems } from '../store';
import { useCart } from '../store';
import ItemCard from './itemCard';

const Showcase = () => {
  const pageSize = 6;
  // const [items, setItems] = useState(itemsList);
  const items = useItems((state) => state.items);

  // const [cartItems, setCartItems] = useState([]);
  const cartItems = useCart((state) => state.cartItems);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [displayCart, setDisplayCart] = useState(false);

  const [isUser, setIsUser] = useState(true);

  //-->временно
  const handleIsUser = () => {
    setIsUser((prev) => !prev);
  };
  //-->временно

  const handleDisplayCart = () => {
    setDisplayCart((prevState) => !prevState);
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
    setCurrentPage(1);
  };

  // useEffect(() => {
  //   cartClean();
  // }, [cartItems]);

  // const cartClean = () => {
  //   let emptyItem = cartItems.find((cartItem) => cartItem.quantity === 0);
  //   if (emptyItem) {
  //     handleCartRemove(emptyItem.id);
  //   }
  // };

  const itemsByCategory = searchQuery
    ? items.filter((item) => item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
    : currentCategory.name
    ? items.filter((item) => item.category === currentCategory.name)
    : items;

  const itemsCrop = paginate(itemsByCategory, currentPage, pageSize);
  let count = itemsByCategory.length;
  return (
    <>
      <Cart displayCart={handleDisplayCart} display={displayCart} />

      <Header
        handleChange={handleCategoryChange}
        handleClear={handleCategoryClear}
        showCart={handleDisplayCart}
        items={cartItems}
        isUser={isUser}
      />
      <button onClick={handleIsUser}>User/no user</button>
      <Search searchQuery={searchQuery} handleSearch={handleSearch} />
      <ItemCard />
      <h2>
        {searchQuery
          ? `Результат поиска по запросу : ${searchQuery}`
          : currentCategory.content
          ? `${currentCategory.content}`
          : 'Все товары'}
      </h2>
      <Items items={itemsCrop} isUser={isUser} />
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
