import React, { useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import RegistrationForm from '../components/common/login/registrationForm';
import LoginForm from '../components/common/login/loginForm';

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(type === 'register' ? type : 'login');

  const toggleFormType = () => {
    setFormType((prevState) => (prevState === 'login' ? 'register' : 'login'));
  };
  return (
    <div className="box">
      <div className="cat_pan-button">
        <span>Учетная запись</span>
      </div>
      <div className={'form-box' + (formType === 'register' ? ' register' : ' login')}>
        {formType === 'register' ? (
          <RegistrationForm handleClick={toggleFormType} />
        ) : (
          <LoginForm handleClick={toggleFormType} />
        )}
      </div>
    </div>
  );
};

export default Login;
