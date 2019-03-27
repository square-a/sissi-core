import * as t from '%/actions/types';

const initialState = 0;

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.SET_LOADING) {
    return state + payload.diff;
  }

  return state;
}

export const getIsLoading = state => state.ui.loading > 0;
