import React, { useState } from 'react';

const TextField = ({ type, name, value, onChange, label }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="inputBox">
      <label htmlFor={name}></label>
      <input
        type={type}
        placeholder={label}
        id={name}
        value={value}
        name={name}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextField;
