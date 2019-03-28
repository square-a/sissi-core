import * as t from '%/actions/types';

export default (store, lStorage = window.localStorage) => next => action => {

  if (action.type === t.RESET_SESSION) {
    lStorage.removeItem('token');
    next(action);
    return;
  }

  const prevToken = store.getState().login.token || '';
  next(action);
  const nextToken = store.getState().login.token || '';

  if (prevToken !== nextToken) {
    lStorage.setItem('token', nextToken);
  }
};
