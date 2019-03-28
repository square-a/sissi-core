import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  className = '',
  options = [],
  input = {},
}) => (
  <select {...input} className={className}>
    <option value='' />
    {options.map(option => (
      <option key={option.key} value={option.key}>{option.label}</option>
    ))}
  </select>
);

Select.propTypes = {
  className: PropTypes.string,
  input: PropTypes.object,
  options: PropTypes.array,
};

export default Select;
