// import httpService from './http.service';
import { imageDB } from '../imgConfig';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

// const productsEndpoint = 'products/';

const imageService = {
  // get: async () => {
  //   const { data } = await httpService.get(productsEndpoint);
  //   console.log(data);
  //   return data;
  // },
  upload: async (e) => {
    const image = ref(imageDB, `images/${v4()}`);
     // REVIEW: null строкой? зачем?
    let imag = 'null';
// REVIEW: а что будет если e.target.files[0] не будте 0 элемента или не будет files или не будет target?
/* REVIEW: зачем дергать then, если тут async/await и можно синхронно получать респонс? */
    await uploadBytes(image, e.target.files[0]).then((data) => {
      let newData = getDownloadURL(data.ref);
      // REVIEW: какой то мусор
      console.log(newData);
      return (imag = newData);
    });
    return imag;
  },
};

export default imageService;
