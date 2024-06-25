import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import userService from '../services/user.service';
import localStorageService, { setTokens } from '../services/localStorage.service';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { useUsers } from '../store/usersStore';
import Loader from '../components/common/loader';

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: { key: process.env.REACT_APP_FIREBASE_KEY },
});
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const initCurrentUser = { name: '', email: '' };
  const history = useHistory();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(initCurrentUser);

  const setCurrentUserState = useUsers((state) => state.setCurrentUser);

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

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
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        switch (message) {
          case 'INVALID_PASSWORD':
            throw new Error('Email или пароль введены некорректно');

          default:
            throw new Error('Слишком много попыток входа. Попробуйте позже');
        }
      }
    }
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
    } catch {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {
            email: 'Пользователь с таким Email уже существует',
          };
          throw errorObject;
        }
      }
    }
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
      setCurrentUserState(content);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  function logOut() {
    localStorageService.removeAuthData();
    setCurrentUser(initCurrentUser);
    setCurrentUserState(initCurrentUser);
    history.push('/login');
  }
  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, currentUser, logIn, logOut, getUserData }}>
      {!isLoading ? children : <Loader />}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
