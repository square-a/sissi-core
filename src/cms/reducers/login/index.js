import * as t from '%/actions/types';

const initialState = {
  token: window.localStorage.getItem('token') || null,
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.LOGIN_SUCCESS) {
    return {
      ...state,
      token: payload.token,
    };

  } else if (type === t.RESET_SESSION) {
    return {
      ...state,
      token: null,
    };
  }

  return state;
};

export const getAuthToken = state => state.login.token;
