import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({ label, value, onChange, defaultOption, options, error, name }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return 'form-select ' + (error ? 'is-invalid' : '');
  };
  let optionsArray;
  if (options) {
    optionsArray =
      !Array.isArray(options) && typeof (options === 'object')
        ? Object.keys(options).map((optionName) => ({
            name: options[optionName].name,
            value: options[optionName]._id,
          }))
        : options;
  }

  return (
    <div className="custom-select">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        value={value}
        id={name}
        name={name}
        onChange={handleChange}>
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option value={option.id} key={option.name}>
              {option.name}
            </option>
          ))}
      </select>
      {/* <span className="custom-arrow"> */}
      <i className="fa-solid fa-circle-arrow-down custom-arrow"></i>
      {/* </span> */}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  defaultOption: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  name: PropTypes.string,
};

export default SelectField;
