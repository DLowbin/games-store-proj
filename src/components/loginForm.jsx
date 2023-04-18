import React, { useState, useEffect } from 'react';
import TextField from './textField';
import { Link } from 'react-router-dom';

function Login() {
  const [data, setData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState();
  //получаем event, а из него забираем target
  const handleChange = ({ target }) => {
    setData((prevstate) => ({ ...prevstate, [target.name]: target.value }));
  };

  const validate = () => {
    const errors = {};
    for (const fieldName in data) {
      if (data[fieldName].trim() === '') {
        errors[fieldName] = `${fieldName} обязательно дял заполнения`;
      }
    }
    setErrors(errors);
  };

  useEffect(() => {
    validate();
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    if (Object.keys(errors).length !== 0) return;
    console.log(data);
  };
  return (
    <div className="box">
      <div className="header__button">
        <Link to={'/'}>
          На главную <img className="home_img playstation" alt="" />
        </Link>
      </div>
      <div className="box__container">
        <div className="box__form">
          <h2>Вход</h2>
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
              <input type="submit" value="Войти" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
