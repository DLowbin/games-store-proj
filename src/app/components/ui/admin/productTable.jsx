import React, { useState } from 'react';
import _ from 'lodash';
import { useCategories } from '../../../hooks/useCategories';
import TextField from '../../common/form/textField';
import Loader from '../../common/loader';
import { useItems } from '../../../store/productsStore';
import httpService from '../../../services/http.service';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { search } from '../../../utils/search';

const ProductTable = () => {
  // const { products } = useProducts();
  const { categories } = useCategories();
  const products = useItems((state) => state.items);
  const setProducts = useItems((state) => state.setItems);

  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });

  async function deleteProd(e, prod) {
    e.preventDefault();
    const sortedProducts = products.filter((item) => item.id !== prod);
    setProducts(sortedProducts);
    try {
      await httpService.delete('products/' + prod, [prod]);
    } catch (error) {}
  }

  const handleSort = (item) => {
    if (sortBy.path === item) {
      setSortBy((prevState) => ({
        ...prevState,
        order: sortBy.order === 'asc' ? 'desc' : 'asc',
      }));
    } else {
      setSortBy({ path: item, order: 'asc' });
    }
  };
  const renderIcon = (sortBy, currentPath) => {
    if (sortBy.path === currentPath) {
      return sortBy.order === 'asc' ? (
        <i className="fa-solid fa-caret-down"></i>
      ) : (
        <i className="fa-solid fa-caret-up"></i>
      );
    }
    return null;
  };
  const [query, setQuery] = useState('');
  const handleSearch = (target) => {
    setQuery(target.value);
  };

  const filteredProducts = query ? search(products, ['id', 'name'], query) : products;
  const sortedProducts = _.orderBy(filteredProducts, [sortBy.path], [sortBy.order]);
  const columns = {
    name: { path: 'name', name: 'Наименование' },
    category: { path: 'category', name: 'Категория' },
    id: { path: 'id', name: 'ID товара' },
    discount: { path: 'discount', name: 'Акция' },
    price: { path: 'price', name: 'Стоимость' },
    edit: { name: 'Ред' },
  };
  const getCategory = (productCat) => {
    let [currentCat] = categories.filter((cat) => cat.id === productCat);
    return currentCat.rus;
    // console.log(currentCat.rus);
  };
  // const catPic = Object.keys(categories).map((cat) => ({ name: categories[cat].rus }));

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
        <i className="fa-regular fa-circle-xmark close" onClick={() => setQuery('')}></i>
      </div>
      <div className="product-box">
        <table className="admin-content-table">
          <thead>
            <tr>
              {Object.keys(columns).map((val) => {
                return (
                  <th
                    key={val}
                    scope="col"
                    onClick={columns[val].path ? () => handleSort(columns[val].path) : undefined}
                    {...{ role: columns[val].path && 'button' }}>
                    {`${columns[val].name}  `}
                    {renderIcon(sortBy, columns[val].path)}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {products && categories ? (
              sortedProducts.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.name}</td>
                  <td>{getCategory(prod.category)}</td>
                  <td>{prod.id}</td>
                  <td>{prod.discount}</td>
                  <td>{prod.initialprice}</td>
                  <td>
                    <button>
                      <Link to={`/showcase/${prod.id}/edit`}>
                        <i className="fa-solid fa-gears"></i>
                      </Link>
                    </button>
                    <button onClick={(e) => deleteProd(e, prod.id)}>
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <Loader />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductTable;
