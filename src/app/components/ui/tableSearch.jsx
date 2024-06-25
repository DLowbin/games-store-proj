import React from 'react';
import TextField from '../common/form/textField';

const TableSearch = ({
  handleClearForm,
  handleSearch,
  query,
  setFilter,
  currentFilter,
  searchCriteria,
}) => {
  return (
    <>
      <div className="table-search">
        <i className="fa-solid fa-magnifying-glass icon"></i>
        <TextField
          label="ПОИСК В ТАБЛИЦЕ"
          value={query}
          onChange={handleSearch}
          name="search"
          autocomplete="off"
        />
        <i className="fa-regular fa-circle-xmark close" onClick={handleClearForm}></i>
      </div>
      <div className="table-search-filter">
        <i
          id="clear"
          className="fa-solid fa-filter-circle-xmark"
          onClick={(e) => setFilter(e, undefined)}></i>
        {searchCriteria.map((status) => (
          <i
            key={status.name}
            onClick={(e) => setFilter(e, e.target.id)}
            id={status.value}
            className={status.icon + (currentFilter === status.value ? ' active' : '')}></i>
        ))}
      </div>
    </>
  );
};

export default TableSearch;
