import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

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

export default SissiRoutes;
