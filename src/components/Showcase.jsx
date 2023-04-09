import React, { useState, useEffect } from 'react';
import Items from './Items';
import Pagination from './Pagination';
import itemsList from '../api/fakeApi.json';
import { paginate } from '../utils/paginate';
import Header from './Header';
import Login from './loginForm';

// const list = gamesList;
const Showcase = () => {
  const count = itemsList.length;
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');

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

  useEffect(() => {
    console.log(`Category `, currentCategory);
  }, [currentCategory]);

  // function filterItems(data) {
  //   const filteredItems = searchValue
  //     ? data.filter((item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
  //     : itemsList;

  //   return filteredItems;
  // }
  // const filteredItems = filterItems(itemsList);

  const itemsByCategory = currentCategory
    ? itemsList.filter((item) => item.category === currentCategory)
    : itemsList;
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
      <Header handleChange={handleCategoryChange} handleClear={handleCategoryClear} />
      <Login />
      <Items items={itemsCrop} />
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
