import React, { useState, useEffect } from 'react';
import Items from './Items';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import Header from './header';
import Cart from './cart';
import Search from './searchForm';
import Footer from './footer';
import { useItems } from '../../store';
import { useCart } from '../../store';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import productsService from '../services/products.service';
import { faHourglass1 } from '@fortawesome/free-solid-svg-icons';
import Loader from './loader';

const Showcase = () => {
  const pageSize = 6;
  const [items, setItems] = useState();
  // const items = useItems((state) => state.items);
  // const setItems = useItems((state) => state.setItems);

  // const [cartItems, setCartItems] = useState([]);
  const cartItems = useCart((state) => state.cartItems);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [displayCart, setDisplayCart] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  async function getProd() {
    try {
      const prod = await productsService.get();
      setItems(prod);
      setIsLoading(false);
    } catch (error) {}
  }

  useEffect(() => {
    getProd();
  }, []);

  const history = useHistory();
  //-->временно
  const handleIsUser = () => {
    setIsUser((prev) => !prev);
  };

  const handleTest = () => {
    history.push(history.location.pathname + 'test');
    console.log(history.location.pathname);
  };
  //-->временно

  const handleDisplayCart = () => {
    setDisplayCart((prevState) => !prevState);
  };

  const handlePageChange = (pageIndex) => {
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
        searchQuery={searchQuery}
        handleSearch={handleSearch}
      />
      <button onClick={handleIsUser}>User/no user</button>
      <button onClick={handleTest}>TEST</button>

      {/* <Search searchQuery={searchQuery} handleSearch={handleSearch} /> */}

      <h2>
        {searchQuery
          ? `Результат поиска по запросу : ${searchQuery}`
          : currentCategory.content
          ? `${currentCategory.content}`
          : 'Все товары'}
      </h2>
      {/* <Items items={itemsCrop} isUser={isUser} isLoading={isLoading} /> */}
      {!isLoading ? <Items items={itemsCrop} isUser={isUser} isLoading={isLoading} /> : <Loader />}
      {/* <Pagination
        itemsCount={count}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      /> */}
      <Footer />
    </>
  );
};

export default Showcase;
