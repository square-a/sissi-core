import * as actions from '%/actions';
import * as k from '%/constants/keywords';
import * as selectors from '%/selectors';

import * as routes from './index';

export default {
  onBeforeChange(dispatch, getState, { action }) {
    const isLoggedIn = selectors.getAuthToken(getState()) !== null;
    const isNavigatingToLogin = action.type === routes.ROUTE_LOGIN;
    const isInitialDataFetched = selectors.getIsInitialDataFetched(getState());

    if (!isLoggedIn) {
      if (!isNavigatingToLogin) {
        return dispatch(actions.redirectToLogin());
      }

    } else {
      if (isNavigatingToLogin) {
        return dispatch(actions.redirectToIndex());
      }

      if (!isInitialDataFetched) {
        dispatch(actions.fetchData(k.STRUCTURE));
        dispatch(actions.fetchData(k.IMAGES));
      }
    }
  }
}
