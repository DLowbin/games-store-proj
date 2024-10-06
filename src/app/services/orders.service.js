import httpService from './http.service';
// REVIEW:  константы в отдельный файл
const ordersEndpoint = 'orders/';

const ordersService = {
  get: async () => {
    const { data } = await httpService.get(ordersEndpoint);
    // REVIEW: какой то мусор
    console.log(data);
    return data;
  },
};

export default ordersService;
