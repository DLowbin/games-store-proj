import React from 'react';

const PricesBlock = ({ discountprice, initialprice }) => {
  return (
    <>
      <span className="discount-price">{initialprice}</span>
      <span className="discount-price current-price">{discountprice}</span>
    </>
  );
};

export default PricesBlock;
