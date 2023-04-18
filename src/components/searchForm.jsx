import React from 'react';

const Search = ({ searchQuery, handleSearch }) => {
  return (
    <div className="container">
      <input
        type="search"
        className="form__input"
        placeholder="Find your game"
        // onChange={() => {
        //   handleSearch();
        // }}
        //почему передаем не callback?
        onChange={handleSearch}
        value={searchQuery}
      />
    </div>
  );
};

export default Search;
