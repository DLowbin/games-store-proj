import httpService from './http.service';

const productsEndpoint = 'products/';
const categoriesEndpoint = 'categories/';

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
