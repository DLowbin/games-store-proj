import React, { useContext, useEffect, useState } from 'react';
import userService from '../services/user.service';
import Loader from '../components/common/loader';

const UsersContext = React.createContext();

export const useUsers = () => {
  return useContext(UsersContext);
};

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
   // REVIEW: какой то мусор
  // const products = useItems((state) => state.items);
  // const setProducts = useItems((state) => state.setItems);
  const [isLoading, setIsLoading] = useState(true);
  // const setCurItems = useItems((state) => state.setItems);
  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const { content } = await userService.get();
      console.log(content);
      setUsers(content);
      // setCurItems(content);
      setIsLoading(false);
    } catch (error) {}
  }
  return (
    <UsersContext.Provider value={{ users }}>
      {!isLoading ? children : <Loader />}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
