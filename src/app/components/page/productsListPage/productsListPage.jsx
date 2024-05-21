import React, { useState, useEffect } from 'react';
import { useProducts } from '../../../hooks/useProducts';
import { paginate } from '../../../utils/paginate';
import Pagination from '../../pagination';
import Items from '../../Items';
import Cart from '../../cart';
import { useCurrentCat } from '../../../store/categoryStore';
import { useIsUser } from '../../../../store';
import Loader from '../../loader';
import { useItems, useSearch } from '../../../store/productsStore';

const ProductsListPage = () => {
  const pageSize = 6;
  // const { products } = useProducts();

  const currentProducts = useItems((state) => state.items);
  const setCurItems = useItems((state) => state.setItems);

  console.log(currentProducts);

  const [currentPage, setCurrentPage] = useState(1);

  const [currentCategory, setCurrentCategory] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const setIsAdmin = useIsUser((state) => state.setIsAdmin);
  const currentCat = useCurrentCat((state) => state.category);
  const searchQuery = useSearch((state) => state.searchQuery);
  const setSearchQuery = useSearch((state) => state.setQuery);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentCategory, searchQuery]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSearch = (event) => {
    setCurrentCategory(undefined);
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

  const handleIsAdmin = () => {
    setIsAdmin();
  };

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
        <div className="box">
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
