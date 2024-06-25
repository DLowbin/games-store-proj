import React from 'react';

const Radiofield = ({ options, name, onChange, value, label }) => {
  return (
    <div>
      {options.map((option) => (
        <div key={option.name + '_' + option.value}>
          <input
            type="radio"
            id={option.name + '_' + option.value}
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={onChange}
          />
          <label htmlFor={option.name + '_' + option.value}>{option.name}</label>
        </div>
      ))}
    </div>
  );
};

export default Radiofield;
