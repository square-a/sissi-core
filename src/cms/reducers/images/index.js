import * as t from '%/actions/types';
import * as k from '%/constants/keywords';

const initialState = [];

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.SEND_REQUEST && payload.dataType === k.IMAGES) {
    if (payload.method === k.GET) {
      return payload.responseData;

    } else if (payload.method === k.POST) {
      return [...state, payload.responseData.fileName];
    }

  } else if (type === t.RESET_SESSION) {
    return initialState;

  }

  return state;
};

export const getAllImages = state => state.images;
