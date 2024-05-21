import React from 'react';

const Search = ({ currentSearchQuery, handleSearch, handleToggle, handleQuery }) => {
  return (
    // <div className="search_container">
    <>
      {/* <input
        type="search"
        className="form__input"
        placeholder="Find your game"
        onChange={handleSearch}
        value={searchQuery}
      /> */}
      <li style={{ '--bg': '#33c45f' }} className={''}>
        <span>
          <div className="icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <input
            type="search"
            id="searchForm"
            className="form__input"
            placeholder="ПОИСК"
            onChange={handleQuery}
            value={currentSearchQuery}
            onKeyDown={handleSearch}
          />
        </span>
        {/* <div className="text">Поиск</div> */}
      </li>
    </>
    // </div>
  );
};

export default Search;
