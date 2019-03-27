import { createSelector } from 'reselect';

import * as t from '%/actions/types';
import * as k from '%/constants/keywords';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.SEND_REQUEST && payload.dataType === k.STRUCTURE) {
    return payload.responseData.fields;

  } else if (type === t.RESET_SESSION) {
    return initialState;
  }

  return state;
}

export const getFields = state => state.structure.fields;

export const getFieldList = fieldListName => state => state.structure.fields[fieldListName]
  ? state.structure.fields[fieldListName]
  : {};

export const getFieldListFields = fieldListName => createSelector(
  [
    getFieldList(fieldListName),
  ],
  fieldList => fieldList.fields
);
