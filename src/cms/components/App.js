import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  withLocalize,
  getActiveLanguage,
} from 'react-localize-redux';

import * as C from '%/components';
import * as selectors from '%/selectors';
import { ROUTE_LOGIN } from '%/router';

const mapStateToProps = (state, { setActiveLanguage }) => {
  const settingsLanguage = selectors.getSettingsLanguage(state);
  const activeLanguage = getActiveLanguage(state.localize);
  if (settingsLanguage && activeLanguage && activeLanguage.code !== settingsLanguage) {
    setActiveLanguage(settingsLanguage);
  }

  return {
    route: selectors.getCurrentRoute(state),
  };
};

const App = ({ route }) => (
  <div className='app'>
    {route === ROUTE_LOGIN
      ? <C.Login />
      : [
        <C.Navigation key='navigation' />,
        <C.Editor key='editor' />,
        <C.ActionBar key='actionbar' />,
        <C.Guide key='guide' />,
        <C.TypePicker key='typePicker' />,
      ]
    }
    <C.Alert />
  </div>
);

App.propTypes = {
  route: PropTypes.string,
};

export default compose(
  withLocalize,
  connect(mapStateToProps)
)(App);
