import { useState, useEffect } from 'react';
import products from '../api/mockData.json';
import categories from '../api/categories.json';
import { v4 } from 'uuid';

import httpService from '../services/http.service';

const useMockData = () => {
  console.log(products);
  async function init() {
    try {
      for (const prod of products) {
        await httpService.put('products/' + prod.id, prod);
      }
      for (const cat of categories) {
        await httpService.put('categories/' + cat.id, cat);
      }
    } catch (error) {}
  }

  return { init };
};

export default useMockData;
