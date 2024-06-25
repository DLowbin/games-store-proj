import React from 'react';
import { useUsers } from '../../../hooks/useUsers';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import UsersTable from '../users/usersTable';
import UserInfo from '../users/userInfo';

const Users = ({ currentUserId }) => {
  console.log(currentUserId);
  const { users } = useUsers();
  const history = useHistory();
  const columns = {
    name: { path: 'name', name: 'Имя' },
    email: { path: 'email', name: 'Контакты' },
    admin: { path: 'admin', name: 'Админ' },
    id: { path: 'id', name: 'ID' },
  };
  const handleUser = (userId) => {
    history.push(`/admin/users/${userId}`);
  };

  const toggleDiv = (e) => {
    if (e.target.id === 'overlay') {
      history.goBack();
    }
  };

  // const [{ id }] = users.filter((user) => user.id === currentUser);
  return (
    <>
      <UsersTable columns={columns} users={users} />
      {currentUserId && (
        <UserInfo
          toggleDiv={toggleDiv}
          // columns={columns}
          currentUserId={currentUserId}
          users={users}
        />
      )}
    </>
  );
};

export default Users;
