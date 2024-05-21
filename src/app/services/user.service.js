import httpService from './http.service';
import localStorageService from './localStorage.service';

const usersEndpoint = 'users/';

const userService = {
  get: async () => {
    const { data } = await httpService.get(usersEndpoint);
    console.log(data);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(usersEndpoint + payload.id, payload);
    console.log(data);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(usersEndpoint + localStorageService.getUserId());
    console.log(data);
    return data;
  },
};

export default userService;
