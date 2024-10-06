import httpService from './http.service';

// REVIEW: константы в отдельный файл
const productsEndpoint = 'products/';
const categoriesEndpoint = 'categories/';
// REVIEW:  не используется
const ordersEndpoint = 'orders/';

const productsService = {
  get: async () => {
    const { data } = await httpService.get(productsEndpoint);
    console.log(data);
    return data;
  },
};

export const categoriesService = {
  get: async () => {
    const { data } = await httpService.get(categoriesEndpoint);
    console.log(data);
    return data;
  },
};

export default productsService;
