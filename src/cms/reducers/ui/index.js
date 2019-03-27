import { combineReducers } from 'redux';

import alert from './alert';
import loading from './loading';
import modal from './modal';

export default combineReducers({
  alert,
  loading,
  modal,
});

export * from './alert';
export * from './loading';
export * from './modal';
