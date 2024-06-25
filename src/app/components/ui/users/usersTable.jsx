import React, { useState } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const UsersTable = ({ columns, users, statusList }) => {
  const history = useHistory();
  const [sortBy, setSortBy] = useState({ path: 'date', order: 'asc' });
  const sortedUsers = _.orderBy(users, [sortBy.path], [sortBy.order]);

  const handleUser = (userId) => {
    history.push(`/admin/users/${userId}`);
  };

  const getStatusIcon = (order) => {
    const [status] = statusList.filter((stat) => stat.value === order.status);
    return status.icon;
  };

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
    <div className="users-box">
      <table className="admin-content-table">
        <thead>
          <tr>
            {Object.keys(columns).map((val) => {
              return (
                <th
                  key={val}
                  scope="col"
                  // onClick={columns[val].path ? () => handleSort(columns[val].path) : undefined}
                  {...{ role: columns[val].path && 'button' }}>
                  {`${columns[val].name}  `}
                  {/* {renderIcon(sortBy, columns[val].path)} */}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              onClick={() => handleUser(user.id)}
              key={user.id}
              // style={{ '--bg': user.status === 'pending' ? '#0fb7d1' : '#33c45f' }}
            >
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'Admin' : 'User'}</td>
              <td>{user.id}</td>
              {/* <td>
          <i className={getStatusIcon(order)}></i>
        </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
