import React, { useState } from 'react';
import _ from 'lodash';

const Table = ({ columns, items }) => {
  const [sortBy, setSortBy] = useState({ path: 'date', order: 'asc' });
  const sortedItems = _.orderBy(items, [sortBy.path], [sortBy.order]);

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
  return (
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
    </table>
  );
};

export default Table;
