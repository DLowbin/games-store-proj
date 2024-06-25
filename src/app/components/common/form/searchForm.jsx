import React from 'react';

const Search = ({ currentSearchQuery, handleSearch, handleQuery }) => {
  return (
    <>
      <li style={{ '--bg': '#33c45f' }} className={''}>
        <span>
          <div className="icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <input
            type="text"
            id="searchForm"
            className="form__input"
            placeholder="ПОИСК"
            onChange={handleQuery}
            value={currentSearchQuery}
            onKeyDown={handleSearch}
          />
        </span>
      </li>
    </>
  );
};

export default Search;
