import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useProducts } from '../../../hooks/useProducts';
import TextField from '../../common/form/textField';
import httpService from '../../../services/http.service';
import { useItems } from '../../../store/productsStore';
import SelectField from '../../common/form/selectField';
// import categories from '../../../api/categories.json';
import { imageDB } from '../../../imgConfig';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useCategories } from '../../../hooks/useCategories';

const EditProduct = () => {
  const { getProducts } = useProducts();

  const { categories } = useCategories();
  const products = useItems((state) => state.items);
  const setProducts = useItems((state) => state.setItems);

  const params = useParams();
  const history = useHistory();
  const [data, setData] = useState({
    id: params.productId,
    name: '',
    category: '',
    image: '',
    initialprice: 0,
    discountprice: 0,
    discount: 0,
  });
  const [discount, setDiscount] = useState(0);
  const [changingImg, setChanginImg] = useState({ previewImg: undefined, updateImg: '' });

  const [currentProduct] = products.filter((prod) => prod.id === params.productId);
  const [currProdCategory] = categories.filter((cat) => cat.id === currentProduct.category);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value, id: currentProduct.id }));
  };
  let finalSumm = Math.floor(data.initialprice * ((100 - data.discount) / 100));

  const handleDiscount = (target) => {
    setDiscount(target.value);
    setData((prevState) => ({
      ...prevState,
      discount: target.value,
      discountprice: Math.floor(data.initialprice * ((100 - target.value) / 100)),
    }));
  };

  useEffect(() => {
    setData(currentProduct);
  }, []);

  async function updateProd(data) {
    try {
      await httpService.patch('products/' + data.id, data);
      await getProducts();
    } catch (error) {}
  }

  async function deleteProd(e) {
    e.preventDefault();
    const sortedProducts = products.filter((item) => item.id !== currentProduct.id);
    history.push('/showcase');

    try {
      await httpService.delete('products/' + data.id, data);
      await getProducts();
    } catch (error) {}
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let btnClass = e.target.classList;
    btnClass.toggle('active');
    setTimeout(() => {
      btnClass.remove('active');
    }, 3000);
    // uploadImage();
    updateProd(data);
    // setData(initData);
    console.log(data);
  };

  const handleImg = (event) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      setChanginImg({ previewImg: e.target.result });
      uploadImage(event.target.files[0]);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  async function uploadImage(file) {
    try {
      const images = ref(imageDB, `images/${v4()}`);
      await uploadBytes(images, file).then((data) => {
        console.log(data, 'imgs');
        getDownloadURL(data.ref).then((val) => {
          console.log(val);
          setData((prevState) => ({ ...prevState, image: val }));
        });
      });
    } catch (error) {}
  }

  const getCategory = Object.keys(categories).map((cat) => ({
    name: categories[cat].rus,
    id: categories[cat].id,
  }));

  return (
    <div className="box">
      <div className="cat_pan-button">
        <span>Редактировать товар</span>
      </div>
      <div className="edit-container">
        <div className="product__card">
          <div className="image-box">
            {currentProduct.discount > 0 ? (
              <div className="discount-box">{`АКЦИЯ: - ${currentProduct.discount} %`}</div>
            ) : discount > 0 ? (
              <div className="discount-box">{`АКЦИЯ: - ${discount} %`}</div>
            ) : (
              ''
            )}
            <img
              src={!changingImg.previewImg ? data.image : changingImg.previewImg}
              alt=""
              className="game__img"
            />
          </div>
          <div className="content">
            <form onSubmit={handleSubmit}>
              <h5 className="edit__header">ID товара</h5>
              <div className="info-display">{currentProduct.id}</div>
              <h5 className="edit__header">наименование</h5>
              <TextField
                label={currentProduct.name}
                value={data.name}
                onChange={handleChange}
                name="name"
              />
              <div className="cost-container">
                <div>
                  <h5 className="edit__header">стоимость</h5>
                  <TextField
                    label={currentProduct.initialprice}
                    value={data.initialprice}
                    onChange={handleChange}
                    name="initialprice"
                  />
                </div>
                <div>
                  <h5 className="edit__header">акция (-%)</h5>
                  <TextField onChange={handleDiscount} value={data.discount} name="discount" />
                </div>
                <div>
                  <h5 className="edit__header">итог</h5>
                  <div className="info-display">
                    {/* {Math.floor(data.price * ((100 - data.discount) / 100))} */}
                    {finalSumm}
                    {/* <TextField
                      onChange={handleChange}
                      value={data.discountprice}
                      name="discountprice"
                    /> */}
                  </div>
                </div>
              </div>
              <h5 className="edit__header">изображение</h5>
              <TextField
                label={currentProduct.image}
                value={data.image}
                onChange={handleChange}
                name="image"
              />
              <div className="cost-container">
                <div>
                  <h5 className="edit__header">изображение</h5>
                  <div className="info-display">
                    <label htmlFor="image-input">ИЗОБРАЖЕНИЕ</label>
                  </div>
                  <input
                    type="file"
                    className="image-input"
                    id="image-input"
                    // onChange={(e) => handleUpload(e)}
                    onChange={(e) => handleImg(e)}
                    name="image"
                  />
                </div>
                <div>
                  <h5 className="edit__header">категория</h5>
                  <SelectField
                    onChange={handleChange}
                    options={getCategory}
                    name={'category'}
                    defaultOption={currProdCategory.rus}
                    // label={'Category'}
                    value={data.category}
                  />
                </div>
              </div>
              <div className="btn-container">
                <div type="submit" className="card__button" onClick={handleSubmit}>
                  <span>
                    <i className="fa-solid fa-floppy-disk"></i>
                  </span>
                </div>
                <div role="button" className="card__button" onClick={deleteProd}>
                  <span>
                    <i className="fa-solid fa-trash-can"></i>
                  </span>
                </div>

                <div
                  role="button"
                  className="card__button"
                  onClick={() => history.push('/showcase')}>
                  <span>
                    <i className="fa-solid fa-house"></i>
                  </span>
                </div>
                <div role="button" className="card__button" onClick={() => history.goBack()}>
                  <span>
                    <i className="fa-solid fa-left-long"></i>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
