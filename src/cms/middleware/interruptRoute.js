import {
  getFormNames,
  isDirty,
} from 'redux-form';

import * as t from '%/actions/types';
import * as actions from '%/actions';
import * as k from '%/constants';
import * as routes from '%/router';
import * as tr from '%/translations/alerts';

let listenForAlerts = false;
let interruptedAction = null;

export default (store, formSelectors = { getFormNames, isDirty }) => next => action => {
  if ([
    routes.ROUTE_INDEX,
    routes.ROUTE_PAGE,
    routes.ROUTE_SECTION,
  ].includes(action.type)) {

    const allFormNames = formSelectors.getFormNames()(store.getState()) || [];
    const formName = allFormNames[0];
    const isFormDirty = formSelectors.isDirty(formName)(store.getState());

    if (isFormDirty && formName !== k.LOGIN) {
      listenForAlerts = true;
      interruptedAction = action;
      store.dispatch(actions.setAlert(k.NEUTRAL, tr.CONFIRM_DISCARD, null, true));
      return;
    }

  } else if (listenForAlerts && action.type === t.CLEAR_ALERTS) {
    if (action.payload.isConfirmed) {
      next(interruptedAction);
    }

    listenForAlerts = false;
    interruptedAction = null;
  }

  next(action);
};
