import axios from 'axios';
import configFile from '../../config.json';
import { httpAuth } from '../hooks/useAuth';
import localStorageService from './localStorage.service';

const http = axios.create({
  baseURL: configFile.apiEndpoint,
});

// REVIEW: какой то мусор
// axios.defaults.baseURL = configFile.apiEndpoint;

function transformData(data) {
// REVIEW: какой то мусор
  // const newData = data ? Object.keys(data).map((key) => ({ ...data[key] })) : [];
  // return newData;
// REVIEW: какой то мусор
  // ---> Модуль 2. Frontend 17. Авторизация и аутентификация. Часть 2
  return data && !data.id ? Object.keys(data).map((key) => ({ ...data[key] })) : data;
}
// REVIEW: какой то мусор
// было http.interceptors.response.use...
http.interceptors.response.use(
  (res) => {
    res.data = { content: transformData(res.data) };
    // console.log(res.data);
    return res;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// REVIEW: какой то мусор
// было http.interceptors.request.use...
http.interceptors.request.use(
  async function (config) {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url = (containSlash ? config.url.slice(0, -1) : config.url) + '.json';

      const expiresDate = localStorageService.getTokenExpiresDate();
      const refreshToken = localStorageService.getRefreshToken();

      if (refreshToken && expiresDate < Date.now()) {
        const { data } = await httpAuth.post('token', {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        });
        // REVIEW: какой то мусор
        // console.log(data);
        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_in,
          localId: data.user_id,
        });
      }
    }
    const accessToken = localStorageService.getAccessToken();
    if (accessToken) {
      config.params = { ...config.params, auth: accessToken };
      // REVIEW: какой то мусор
      console.log(config);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// REVIEW: какой то мусор
// const httpService = {
//   get: axios.get,
//   post: axios.post,
//   put: axios.put,
//   delete: axios.delete,
// };

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;
