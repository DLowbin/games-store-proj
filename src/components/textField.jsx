import React from 'react';

const TextField = ({ placeholder, type, name, value, onChange }) => {
  return (
    <div className="inputBox">
      <label htmlFor={name}></label>
      <input
        type={type}
        placeholder={placeholder}
        id={name}
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default TextField;
