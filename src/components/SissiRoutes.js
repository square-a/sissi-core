/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-multi-comp */
const React = require('react');
const PropTypes = require('prop-types');
const { Route } = require('react-router');

const buildRouteContent = require('../utils/buildRouteContent');

const SissiRoutes = ({ content, EntryComponent }) => {
  // eslint-disable-next-line react/prop-types
  const EntryComponentWithProps = ({ match }) => <EntryComponent {...buildRouteContent(content, match)} />;

  return (
    <Route path=''>
      <>
        <Route
          component={EntryComponentWithProps}
          exact
          path=''
        />
        <Route
          component={EntryComponentWithProps}
          exact
          path='/:pageSlug'
        />
        <Route
          component={EntryComponentWithProps}
          exact
          path='/:pageSlug/:sectionSlug'
        />
      </>
    </Route>
  );
};

SissiRoutes.propTypes = {
  content: PropTypes.object.isRequired,
  EntryComponent: PropTypes.func.isRequired,
};

module.exports = SissiRoutes;
