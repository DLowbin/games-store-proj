import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useAuth } from '../hooks/useAuth';
import Loader from './common/loader';
import PricesBlock from './pricesBlock';
import { initial } from 'lodash';

const Product = ({ items, handleAddToCart, isLoading }) => {
  const { currentUser } = useAuth();
  console.log(currentUser);

  // useEffect(() => {
  //   getProd();
  // }, []);
  // async function getProd() {
  //   try {
  //     const prod = await productsService.get();
  //     setData(prod);
  //     setIsLoading(false);
  //   } catch (error) {}
  // }

  <></>;
  return !isLoading ? (
    items.map((item) => (
      <div className="card" key={item.id}>
        <div className="content">
          <div className="product__img">
            {item.discount > 0 && (
              <div className="discount-box">{`АКЦИЯ: - ${item.discount} %`}</div>
            )}
            <img
              // src={require(`../images/${item.category}/${item.image}`)}
              src={item.image}
              alt=""
            />
          </div>

          <span>{item.name}</span>
          <div className="product-price-block">
            {item.discount ? (
              <PricesBlock initialprice={item.initialprice} discountprice={item.discountprice} />
            ) : (
              item.initialprice
            )}
          </div>
          <div className="button__box">
            <div
              role="button"
              className="card__button"
              onClick={() => {
                handleAddToCart(item);
              }}>
              {currentUser.id ? (
                <span>В корзину</span>
              ) : (
                <span>
                  <Link to={'/login'}>Войти</Link>
                </span>
              )}
            </div>
            {/* <div role="button" className="gear"> */}
            {currentUser.isAdmin && (
              <Link className="gear" to={`/showcase/${item.id}/edit`}>
                <i className="fa-solid fa-gear gear"></i>
              </Link>
            )}
            {/* </div> */}
            {/* <div className={'gear'}>
              {currentUser.isAdmin && (
                <Link to={`/showcase/${item.id}/edit`}>
                  <i className="fa-solid fa-gear"></i>
                </Link>
              )}
            </div> */}
          </div>
        </div>
      </div>
    ))
  ) : (
    <Loader />
  );
};

export default Product;
