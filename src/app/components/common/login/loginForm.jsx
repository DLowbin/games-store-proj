import React, { useState } from 'react';
import TextField from '../form/textField';
import { useAuth } from '../../../hooks/useAuth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const LoginForm = ({ handleClick }) => {
  const [data, setData] = useState({ email: '', password: '', stayOnline: false });
  const history = useHistory();
  const { logIn } = useAuth();

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  // почему handleSubmit делаем async ?

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      await logIn(data);
      history.push('/showcase');
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <div className="inputBox">
        <TextField
          // label="Электронная почта"
          value={data.email}
          onChange={handleChange}
          name="email"
        />
        <span className="formLabel">Электронная почта</span>
        <i></i>
      </div>
      <div className="inputBox login">
        <TextField
          // label="Пароль"
          value={data.password}
          onChange={handleChange}
          name="password"
          type={'password'}
        />
        <span className="formLabel">Пароль</span>
        <i></i>
      </div>

      <div className="login-button" onClick={handleSubmit}>
        {/* <input type="submit" value="Войти" /> */}
        <span>Войти</span>
      </div>
      <div className="links">
        <span>Нет учетной записи?</span>
        <span>
          <a role="button" onClick={handleClick}>
            {' Зарегистрироваться'}
          </a>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
