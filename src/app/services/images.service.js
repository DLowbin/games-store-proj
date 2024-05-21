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
    let imag = 'null';
    await uploadBytes(image, e.target.files[0]).then((data) => {
      let newData = getDownloadURL(data.ref);
      console.log(newData);
      return (imag = newData);
    });
    return imag;
  },
};

export default imageService;
