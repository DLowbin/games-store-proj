import '../styles/loader.scss';
import React from 'react';

const Loader = () => {
  return (
    <>
      <div className="loader__container">
        {' '}
        {/* <img className="loader" src="" alt="" /> */}
        {/* <div className="loader">U</div> */}
        {/* <i className="triangle loader"></i> */}
        <i className="fa-regular fa-circle loader"></i>
        <i className="fa-solid fa-xmark loader"></i>
        <i className="fa-regular fa-square-full loader"></i>
      </div>
    </>
  );
};

export default Loader;
