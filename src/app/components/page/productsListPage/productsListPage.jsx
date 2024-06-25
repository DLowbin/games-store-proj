import React, { useState, useEffect, useRef } from 'react';
import { paginate } from '../../../utils/paginate';
import Pagination from '../../common/pagination';
import Items from '../../Items';
import Cart from '../../common/cart/cart';
import { useCurrentCat } from '../../../store/categoryStore';
import { useItems, useSearch } from '../../../store/productsStore';

const ProductsListPage = () => {
  const divBlock = useRef(null);
  const pageSize = 6;
  // const { products } = useProducts();

  const currentProducts = useItems((state) => state.items);
  // const setCurItems = useItems((state) => state.setItems);
  const [currentPage, setCurrentPage] = useState(1);

  const [currentCategory, setCurrentCategory] = useState('');

  // const [isLoading, setIsLoading] = useState(true);
  const currentCat = useCurrentCat((state) => state.category);
  const searchQuery = useSearch((state) => state.searchQuery);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentCategory, searchQuery]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  // const handleSearch = (event) => {
  //   setCurrentCategory(undefined);
  //   setSearchQuery(event.target.value);
  // };

  // const handleCategoryChange = (event) => {
  //   setCurrentCategory({ name: event.target.name, content: event.target.textContent });
  //   setCurrentPage(1);
  //   setSearchQuery('');
  // };

  // const handleCategoryClear = () => {
  //   setCurrentCategory('');
  //   setSearchQuery('');
  //   setCurrentPage(1);
  // };

  if (currentProducts) {
    const itemsByCategory = searchQuery
      ? currentProducts.filter(
          (item) => item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        )
      : currentCat.name !== 'all'
      ? currentProducts.filter((item) => item.category === currentCat.id)
      : currentProducts;
    // const itemsByCategory = searchQuery
    //   ? products.filter((item) => item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
    //   : params.filterId
    //   ? products.filter((item) => item.category === params.filterId)
    //   : products;

    const itemsCrop = paginate(itemsByCategory, currentPage, pageSize);
    let count = itemsByCategory.length;
    // const clearFilter = () => {
    //   setCurrentCategory();
    // };

    return (
      <>
        <div ref={divBlock} className="box">
          <Cart />
          {/* <Header
            // handleChange={handleCategoryChange}
            handleClear={handleCategoryClear}
            showCart={handleDisplayCart}
            // items={cartItems}
            isUser={isUser}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
          /> */}

          <div style={{ '--bg': ` ${currentCat.color}` }} className="cat_pan-button">
            <span>{currentCat.rus}</span>
          </div>
          {/* <button onClick={showDivWidth}>DIV WIDTH</button> */}
          <div
            style={{ '--bg': ` ${currentCat.color}` }}
            className={'cat_pan-button search' + (searchQuery ? ' active' : '')}>
            <span>{searchQuery}</span>
          </div>

          {count > 0 && (
            <>
              <Items items={itemsCrop} />
            </>
          )}
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </>
    );
  }
  return 'LOADING...';
};

export default ProductsListPage;
