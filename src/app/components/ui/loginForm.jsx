import React, { useState } from 'react';
import TextField from '../textField';
import { useAuth } from '../../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const LoginForm = (toggleForm) => {
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
      <TextField
        label="Электронная почта"
        value={data.email}
        onChange={handleChange}
        name="email"
      />
      <TextField
        label="Пароль"
        value={data.password}
        onChange={handleChange}
        name="password"
        type={'password'}
      />
      <div className="sign_up-button" onClick={handleSubmit}>
        {/* <input type="submit" value="Войти" /> */}
        <span>Войти</span>
      </div>
    </form>
  );
};

export default LoginForm;
