import React, { useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import RegistrationForm from '../components/ui/registrationForm';
import LoginForm from '../components/ui/loginForm';

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(type === 'register' ? type : 'login');

  const toggleFormType = (params) => {
    setFormType((prevState) => (prevState === 'login' ? 'register' : 'login'));
  };
  return (
    <div className="box">
      <div className="cat_pan-button">
        <span>Учетная запись</span>
      </div>
      <div className="box__container">
        <div className="box__form">
          {formType === 'register' ? (
            <>
              <h2>Регистрация</h2>
              <RegistrationForm />
              <p>
                Есть учетная запись?{' '}
                <a role="button" onClick={toggleFormType}>
                  Войти.
                </a>
              </p>
            </>
          ) : (
            <>
              <h2>Вход</h2>
              <LoginForm />
              <p>
                Нет учетной записи?
                <a role="button" onClick={toggleFormType}>
                  {' Зарегистрироваться.'}
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
