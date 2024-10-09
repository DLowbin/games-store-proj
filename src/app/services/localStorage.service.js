const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refresh-token';
const EXPIRES_KEY = 'jwt-expires';
const USERID_KEY = 'user-local-id';
const USER_CART_KEY = 'games-store-cart';

// ---> localId(id новосозданного пользователя) возвращается в payload после выполнения signUp

/*  
  REVIEW: Это не LocalStorageServise, это сервис для работы с токеном через LocalStorage
  для авторизации лучше работать с куками, тк им можно задавать срок жизни, и не придется стороить костыли
  с проверкой времени жизни через запись Date

  Если же хочется остаться с LocakStorege, то пишется обертка вокруг системного localStorage, где будут реализованы
  механизм записи времени жизни данных, и методы доступа get/set; Затем вокруг него строится сервис по авторизации и хранению токенов

*/

export function setTokens({ refreshToken, idToken, expiresIn = 3600, localId }) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(USERID_KEY, localId);
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
}

export function setCartItems(payload) {
  return localStorage.setItem(USER_CART_KEY, payload);
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}

export function getUserId() {
  return localStorage.getItem(USERID_KEY);
}
export function removeAuthData() {
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData,
};

export default localStorageService;
