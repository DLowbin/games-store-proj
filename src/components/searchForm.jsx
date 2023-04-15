import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Search = ({ searchQuery, handleSearch }) => {
  return (
    <div className="container">
      {/* <button className="form__button">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button> */}
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
