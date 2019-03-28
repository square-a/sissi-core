import {
  getFormNames,
  getFormValues,
} from 'redux-form';

import {
  setAlert,
  redirectToIndex,
} from '%/actions';
import * as t from '%/actions/types';
import * as k from '%/constants';
import * as tr from '%/translations';

export const fetchData = dataType => {
  const action = {
    type: t.SEND_REQUEST,
    payload: {
      method: k.GET,
      dataType,
      onSuccess: [],
    },
  };

  if (dataType === k.STRUCTURE) {
    action.payload.onSuccess.push(dispatch => dispatch(fetchData(k.CONTENT)));
  }

  return action;
};

export const buildPage = () => ({
  type: t.SEND_REQUEST,
  payload: {
    method: k.POST,
    dataType: k.BUILD,
    onSuccess: [dispatch => dispatch(setAlert(k.SUCCESS, tr.SUCCESS_PUBLISH))],
  },
});

export const postContent = buildAfter => (dispatch, getState, selectFormNames = getFormNames) => {
  const allFormNames = selectFormNames()(getState()) || [];
  const formName = allFormNames[0];

  const action = {
    type: t.SEND_REQUEST,
    payload: {
      method: k.POST,
      dataType: k.CONTENT,
      formName,
      onSuccess: [],
    },
  };
  if (buildAfter) {
    action.payload.onSuccess.push(() => dispatch(buildPage()));
  } else {
    action.payload.onSuccess.push(() => dispatch(setAlert(k.SUCCESS, tr.SUCCESS_SAVE)));
  }

  dispatch(action);
};

export const saveImage = image => ({
  type: t.SEND_REQUEST,
  payload: {
    method: k.POST,
    dataType: k.IMAGES,
    contentType: 'file',
    requestData: image,
  },
});

export const loginSuccess = ({ token }) => ({
  type: t.LOGIN_SUCCESS,
  payload: { token },
});

export const login = () => (dispatch, getState, selectFormValues = getFormValues) => {
  const values = selectFormValues(k.LOGIN)(getState());
  if (values) {
    dispatch({
      type: t.SEND_REQUEST,
      payload: {
        method: k.POST,
        dataType: k.LOGIN,
        requestData: { username: values.username, password: values.password },
        onSuccess: [
          (_, data) => dispatch(loginSuccess(data)),
          () => dispatch(redirectToIndex()),
        ],
      },
    });
  } else {
    dispatch(setAlert(k.ERROR, tr.ERROR_AUTH));
  }
};

export const resetSession = () => ({
  type: t.RESET_SESSION,
});
