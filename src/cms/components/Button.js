import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  classes,
  onClick,
}) => (
  <button className={`button ${classes}`} type='button' onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  children: null,
  classes: '',
  onClick: () => null,
};

export default Button;
