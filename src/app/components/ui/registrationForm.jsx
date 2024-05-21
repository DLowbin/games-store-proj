import React, { useState } from 'react';
import TextField from '../textField';
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const RegistrationForm = (toggleFomTtype) => {
  // console.log(process.env);
  const history = useHistory();
  const [data, setData] = useState({ name: '', email: '', password: '' });

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const { signUp } = useAuth();

  // почему handleSubmit делаем async ?

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      await signUp(data);
      history.push('/showcase');
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Имя" value={data.name} onChange={handleChange} name="name" />
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
        <span>Регистрация</span>
      </div>
    </form>
  );
};

export default RegistrationForm;
