const React = require('react');
const PropTypes = require('prop-types');
const { NavLink } = require('react-router-dom');

const SissiLink = ({ children, ...props }) => (
  <NavLink {...props} data-type='sissi-internal'>
    {children}
  </NavLink>
);

SissiLink.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SissiLink;
