import * as t from '%/actions/types';

const initialState = {
  type: '',
  data: {},
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.SET_MODAL) {
    return {
      ...state,
      ...payload,
    };
  }

  return state;
};

export const getModalState = state => state.ui.modal;
