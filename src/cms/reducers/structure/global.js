import * as t from '%/actions/types';
import * as k from '%/constants/keywords';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.SEND_REQUEST && payload.dataType === k.STRUCTURE) {
    return payload.responseData.global || initialState;

  } else if (type === t.RESET_SESSION) {
    return initialState;
  }

  return state;
}

export const getMaxAmountOfPages = state => state.structure.global.maxItems;
