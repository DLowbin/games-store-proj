import '../../styles/loader.scss';
import triangle_logo from '../../images/triangle.png';
import React from 'react';

const Loader = () => {
  return (
    <div className="box">
      <div className="loader__container">
        {/* <img className="loader" src="" alt="" /> */}
        {/* <div className="loader">U</div> */}
        {/* <i className="triangle loader"></i> */}
        <img src={triangle_logo} className="loader" />
        <i className="fa-regular fa-circle loader"></i>
        <i className="fa-solid fa-xmark loader"></i>
        <i className="fa-regular fa-square-full loader"></i>
      </div>
    </div>
  );
};

export default Loader;
