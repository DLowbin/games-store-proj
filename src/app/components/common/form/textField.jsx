import React from 'react';

const TextField = ({ type, name, value, onChange, label, autocomplete }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  // const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <label htmlFor={name}></label>
      <input
        type={type}
        placeholder={label}
        id={name}
        value={value}
        name={name}
        onChange={handleChange}
        autoComplete={autocomplete}
      />
    </>
  );
};

export default TextField;
