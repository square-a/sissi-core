const React = require('react');
const PropTypes = require('prop-types');
const { Route } = require('react-router');

const SissiRoutes = ({ routes = [], children }) => (
  <div>
    {routes.map(route => {
      const childrenWithProps = React.cloneElement(children, { ...route });

      return (
        <Route
          key={route.path === '' ? 'index' : route.path}
          exact
          path={route.path}
          // eslint-disable-next-line react/jsx-no-bind
          render={() => childrenWithProps}
        />
      );
    })}
  </div>
);

SissiRoutes.propTypes = {
  children: PropTypes.node.isRequired,
  routes: PropTypes.array.isRequired,
};

module.exports = SissiRoutes;
