import * as actions from '%/actions';
import * as t from '%/actions/types';
import ajax from '%/adapters/ajax';
import * as k from '%/constants/keywords';
import { transformToMarkdown } from '%/helpers/markdownHtmlConverter';
import * as selectors from '%/selectors';
import * as tr from '%/translations';

const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3010/api'
  : `${window.location.origin}/api`;

export default (store, client = ajax, getters = selectors) => next => async action => {
  const { type, payload } = action;

  if (type === t.SEND_REQUEST) {
    const {
      method,
      dataType,
      requestData = {},
      contentType = 'json',
      onSuccess = [],
    } = payload;

    const endpoint = `${API_URL}/${dataType}`;
    const token = getters.getAuthToken(store.getState());

    try {
      store.dispatch(actions.activateLoading());
      const response = await client(endpoint, token, contentType)[method](requestData);
      let responseData = response[0];

      if (dataType === k.CONTENT) {
        const fields = getters.getFields(store.getState());
        responseData = transformToMarkdown(response[0], fields);
      }

      payload.responseData = responseData;

      onSuccess.forEach(fn => fn(store.dispatch, responseData));

      next(action);

    } catch (error) {
      const errorCode = error[0] ? error[0].status : 500;
      switch (errorCode) {
        case 401:
          store.dispatch(actions.resetSession());
          store.dispatch(actions.redirectToLogin());
          store.dispatch(actions.setAlert(k.ERROR, tr.ERROR_AUTH));
          break;

        case 403:
          store.dispatch(actions.setAlert(k.ERROR, tr.ERROR_LOGIN));
          break;

        case 422:
          store.dispatch(actions.setAlert(k.ERROR, tr.ERROR_BUILD));
          break;

        default:
          store.dispatch(actions.setAlert(k.ERROR, tr.ERROR_SERVER));
      }

    } finally {
      store.dispatch(actions.deactivateLoading());
    }

  } else {
    next(action);
  }
};
