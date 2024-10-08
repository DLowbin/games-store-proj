import React, { useState, useEffect } from 'react';
import { imageDB } from '../../../imgConfig';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import useMockData from '../../../utils/mockData';
import TextField from '../../common/form/textField';
import httpService from '../../../services/http.service';
import SelectField from '../../common/form/selectField';
import categories from '../../../api/categories.json';
import { useItems } from '../../../store/productsStore';
import { useProducts } from '../../../hooks/useProducts';

const AddProduct = () => {
  const { getProducts } = useProducts();

  const initData = {
    id: '',
    name: '',
    category: '',
    image: '',
    price: '',
    discount: 0,
  };

  //------> Temporary
  const { init } = useMockData();
  const handleClick = () => {
    init();
  };
  //------> Temporary
  const products = useItems((state) => state.items);
  // const setProducts = useItems((state) => state.setItems);
  console.log(products);
  const [data, setData] = useState({
    id: '',
    name: '',
    category: '',
    image: '',
    price: '',
    discount: 0,
  });

  const [imageBuffer, setImageBuffer] = useState();
  const [isUploaded, setIsUploaded] = useState(false);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value, id: v4() }));
  };

  const handleFormClear = () => {
    setData(initData);
  };

  const handleImage = (event) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      setData((prevState) => ({ ...prevState, image: e.target.result }));
    };
    reader.readAsDataURL(event.target.files[0]);
    setImageBuffer(event.target.files[0]);
  };

  async function handleUpload(file) {
    // console.log(e.target.files[0]);
    const imgs = ref(imageDB, `images/${v4()}`);
    const uploadTask = uploadBytesResumable(imgs, file);
    // uploadBytesResumable(imgs, file).then((data) => {
    //   // console.log(data, 'imgs');
    //   getDownloadURL(data.ref).then((val) => {
    //     // console.log(val);
    //     setData((prevState) => ({ ...prevState, image: val }));
    //     // console.log(data);
    //   });
    // });
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setData((prevState) => ({ ...prevState, image: downloadURL }));
          setIsUploaded(true);
        });
      }
    );
  }

  async function addProd(data) {
    try {
      // await handleUpload(imageBuffer);
      await httpService.put('products/' + data.id, data);
      await getProducts();
    } catch (error) {}
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // products.push(data);
    addProd(data);
  };

  // const handleUpload = (file) => {
  //   // console.log(e.target.files[0]);
  //   const imgs = ref(imageDB, `images/${v4()}`);
  //   uploadBytes(imgs, file).then((data) => {
  //     // console.log(data, 'imgs');
  //     getDownloadURL(data.ref).then((val) => {
  //       console.log(val);
  //       // setData((prevState) => ({ ...prevState, image: val }));
  //     });
  //   });
  // };

  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    console.log(imageBuffer);
  }, [imageBuffer]);

  return (
    <>
      <div className="edit-container">
        <button onClick={handleClick}>USE MOCK DATA</button>
        <div className="product__card">
          {!data.image ? (
            <>
              <i className="fa-regular fa-image preview-img"></i>
              <p className="preview-text">ДОБАВЬТЕ ИЗОБРАЖЕНИЕ ТОВАРА</p>
            </>
          ) : (
            <img src={data.image} alt="" className="game__img" />
          )}

          <div className="content">
            {/* <h4>{curProd.name}</h4>
          <h2>{curProd.platform}</h2>
          <p>{curProd.price}</p> */}
            {/* <button
          onClick={() => {
            handleAddToCart(item.category);
          }}>
          {isUser ? 'В корзину' : <Link to={'/login'}>Регистрация</Link>}
          <div className={'gear'}>{isAdmin && <i className="fa-solid fa-gear"></i>}</div>
        </button> */}
            <form onSubmit={handleSubmit}>
              <h5 className="edit__header">ID товара</h5>
              <TextField
                // label={curProd.id}
                value={''}
                onChange={handleChange}
                name="id"
                type={'textarea'}
                autocomplete="off"
              />
              <h5 className="edit__header">наименование</h5>
              <TextField
                // label={curProd.name}
                value={data.name}
                onChange={handleChange}
                name="name"
                autocomplete="off"
              />
              <h5 className="edit__header">стоимость</h5>
              <TextField
                // label={curProd.price}
                value={data.price}
                onChange={handleChange}
                name="price"
              />
              <h5 className="edit__header">изображение</h5>
              <TextField
                // label={curProd.price}
                value={data.image}
                // onChange={handleChange}
                name="image"
                autocomplete="off"
              />
              <div className="custom-file-select">
                <input
                  type="file"
                  // onChange={(e) => handleUpload(e)}
                  onChange={(e) => handleImage(e)}
                  name="image"
                  className="file-select"
                />
                <i
                  className={
                    'fa-solid fa-cloud-arrow-up custom-arrow' + (isUploaded ? ' active' : '')
                  }
                  onClick={() => handleUpload(imageBuffer)}></i>
              </div>
              <h5 className="edit__header">категория</h5>
              <SelectField
                onChange={handleChange}
                options={categories}
                name={'category'}
                defaultOption={'Категория'}
                // label={'Category'}
                value={data.category}
              />
              <div
                type="submit"
                className="card__button"
                onClick={isUploaded ? handleSubmit : null}>
                <span>Добавить товар</span>
              </div>
              <div type="submit" className="card__button" onClick={handleFormClear}>
                <span>Очистить форму</span>
              </div>
              <div className="card__button" onClick={() => handleUpload(imageBuffer)}>
                <span>SAVE IMG</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
