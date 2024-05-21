import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import _ from 'lodash';
import { useCategories } from '../../hooks/useCategories';
import SelectField from '../selectField';
import TextField from '../textField';
const ProductTable = () => {
  const { products } = useProducts();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const { categories } = useCategories();
  if (categories) {
    console.log(categories);
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
  const sortedUsers = _.orderBy(products, [sortBy.path], [sortBy.order]);
  const columns = {
    image: { name: 'Изображение' },
    name: { path: 'name', name: 'Наименование' },
    category: { path: 'category', name: 'Категория' },
    id: { path: 'id', name: 'ID товара' },
    price: { path: 'price', name: 'Стоимость' },
    edit: { name: 'Ред' },
  };
  const getCategory = (productCat) => {
    let [currentCat] = categories.filter((cat) => cat.id === productCat);
    return currentCat.rus;
    // console.log(currentCat.rus);
  };
  const catPic = Object.keys(categories).map(
    (cat) => ({ name: categories[cat].rus })
    // categories[cat].rus
  );
  console.log(catPic);
  return (
    <div className="box">
      <table className="product-table">
        <thead>
          <tr>
            {Object.keys(columns).map((val) => {
              return (
                <th
                  key={val}
                  scope="col"
                  onClick={columns[val].path ? () => handleSort(columns[val].path) : undefined}
                  {...{ role: columns[val].path && 'button' }}>
                  {columns[val].name}
                  {renderIcon(sortBy, columns[val].path)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {products &&
            categories &&
            sortedUsers.map((prod) => (
              <tr key={prod.id}>
                <td>
                  <img
                    src={prod.image}
                    style={{ height: '80px', width: '60px' }}
                    // className="cart__img"
                    alt=""
                  />
                </td>
                <td>{prod.name}</td>
                <td>
                  <SelectField options={catPic} />
                  {/* {getCategory(prod.category)} */}
                </td>
                <td>{prod.id}</td>
                <td>
                  {' '}
                  <TextField
                    label={prod.price}
                    // value={data.price}
                    // onChange={handleChange}
                    name="price"
                  />
                </td>
                <td>
                  <button className="btn-save" onClick={() => console.log(prod.id)}>
                    <i className="fa-solid fa-floppy-disk"></i>
                  </button>
                  <button className="btn-delete" onClick={() => console.log(prod.id)}>
                    {' '}
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
