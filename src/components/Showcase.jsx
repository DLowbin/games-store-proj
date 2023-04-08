import React, { useState } from 'react';
import Items from './Items';
import Pagination from './Pagination';
import itemsList from '../api/fakeApi.json';
import { paginate } from '../utils/paginate';
import Header from './Header';

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
    console.log(event.target.name);
    console.log(currentCategory);
  };

  function filterItems(data) {
    const filteredItems = searchValue
      ? data.filter((item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
      : itemsList;

    return filteredItems;
  }
  const filteredItems = filterItems(itemsList);
  const itemsCrop = paginate(filteredItems, currentPage, pageSize);

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
      <h2>{!searchValue ? 'Все товары' : `Результат поиска по запросу: ${searchValue}`}</h2>
      <Header handleChange={handleCategoryChange} />
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
