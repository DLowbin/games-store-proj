import React, { useState } from 'react';
import TextField from './textField';
import { Link } from 'react-router-dom';

function Login() {
  const [data, setData] = useState({ username: '', password: '' });
  //оплучаем event, а из него забираем target
  const handleChange = ({ target }) => {
    setData((prevstate) => ({ ...prevstate, [target.name]: target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <div className="box">
      {/* <li className="header__item"> */}
      <div className="header__button">
        <Link to={'/'}>
          <img className="home_img" src="../images/playstation.svg" alt="" />
          <img className="home_img" src="../images/xbox.svg" alt="" />
        </Link>
      </div>
      {/* </li> */}
      <div className="box__container">
        <div className="box__form">
          <h2>Login form</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              placeholder="Имя пользователя"
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
            <TextField
              placeholder="Пароль"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            <div className="inputBox">
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
