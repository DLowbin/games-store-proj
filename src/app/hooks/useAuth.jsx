import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import userService from '../services/user.service';
import localStorageService, { setTokens } from '../services/localStorage.service';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: { key: process.env.REACT_APP_FIREBASE_KEY },
});
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const initCurrentUser = { name: '', email: '' };
  const [currentUser, setCurrentUser] = useState(initCurrentUser);

  async function logIn({ email, password }) {
    // const url = `signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      getUserData();
    } catch (error) {}
  }

  async function signUp({ email, password, ...rest }) {
    // const url = `signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      await createUser({ id: data.localId, email, isAdmin: false, ...rest });
      console.log(data);
    } catch (error) {}
  }
  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      console.log(content);
      setCurrentUser(content);
    } catch (error) {}
  }

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      console.log(content);
      setCurrentUser(content);
    } catch (error) {}
  }

  function logOut() {
    localStorageService.removeAuthData();
    setCurrentUser(initCurrentUser);
    history.push('/login');
  }
  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, currentUser, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
