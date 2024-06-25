import React, { useState, useEffect } from 'react';
import TextField from '../form/textField';
import { useAuth } from '../../../hooks/useAuth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { validator } from '../../../utils/validator';

const RegistrationForm = ({ handleClick }) => {
  // console.log(process.env);
  const history = useHistory();
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  // const getInputClasses = () => {
  //   return errors.email ? ' is-invalid' : '';
  // };

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения',
      },
      isEmail: {
        message: 'Email введен некорректно',
      },
    },
    name: {
      isRequired: {
        message: 'Имя обязательно для заполнения',
      },
      min: {
        message: 'Имя должно состоять минимум из 3 символов',
        value: 3,
      },
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения',
      },
      // isCapitalSymbol: {
      //   message: 'Пароль должен содержать хотя бы одну заглавную букву',
      // },
      // isContainDigit: {
      //   message: 'Пароль должен содержать хотя бы одно число',
      // },
      // min: {
      //   message: 'Пароль должен состоять минимум из 8 символов',
      //   value: 8,
      // },
    },
  };
  // useEffect(() => {
  //   validate();
  // }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const { signUp } = useAuth();

  // почему handleSubmit делаем async ?

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const isValid = validate();
    if (!isValid) return;
    try {
      await signUp(data);
      history.push('/showcase');
    } catch (e) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      <div className="inputBox register">
        <TextField
          // label="Имя"
          value={data.name}
          onChange={handleChange}
          name="name"
          autocomplete={'off'}
        />
        <span className="formLabel">Имя пользователя</span>
        <i className={errors.name ? ' is-invalid' : ''}></i>
        <p>{errors.name}</p>
      </div>
      <div className="inputBox">
        <TextField
          // label="Электронная почта"
          value={data.email}
          onChange={handleChange}
          name="email"
          error={errors.email}
          autocomplete={'off'}
        />
        <span className="formLabel">Электронная почта</span>
        <i className={errors.email ? ' is-invalid' : ''}></i>
        <p>{errors.email}</p>
      </div>
      <div className="inputBox">
        <TextField
          // label="Пароль"
          value={data.password}
          onChange={handleChange}
          name="password"
          type={'password'}
        />
        <span className="formLabel">Пароль</span>
        <i className={errors.password ? ' is-invalid' : ''}></i>
        <p>{errors.password}</p>
      </div>
      <div className="login-button" onClick={handleSubmit}>
        {/* <input type="submit" value="Войти" /> */}
        <span>Зарегистрироваться</span>
      </div>{' '}
      <div className="links">
        <span>Уже зарегистрированы?</span>
        <span>
          <a role="button" onClick={handleClick}>
            Войти.
          </a>
        </span>
      </div>
    </form>
  );
};

export default RegistrationForm;
