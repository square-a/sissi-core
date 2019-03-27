import _merge from 'lodash.merge';

import * as t from '%/actions/types';
import * as k from '%/constants/keywords';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch(type) {
    case t.SEND_REQUEST:
      if (payload.dataType === k.CONTENT) {
        return payload.responseData.sections || initialState;
      }
      return state;

    case t.ADD_SECTION:
      return {
        ...state,
        [payload.section._id]: payload.section,
      };

    case t.DELETE_SECTION:
      const { [payload.sectionId]: sectionToDelete, ...newState } = state;
      return newState;

    case t.ADD_LIST_ITEM:
      if (payload.parentType === k.SECTIONS) {
        const newList = state[payload.parentId][payload.listName].concat([payload.listItem]);
        return _merge({}, state, {
          [payload.parentId]: {
            [payload.listName]: newList,
          },
        });
      }
      return state;

    case t.DELETE_LIST_ITEM:
      if (payload.parentType === k.SECTIONS) {
        return {
          ...state,
          [payload.parentId]: {
            ...state[payload.parentId],
            [payload.listName]: state[payload.parentId][payload.listName]
              .filter((i, index) => index !== payload.itemIndex),
          },
        };
      }
      return state;

    case t.RESET_SESSION:
      return initialState;

    default:
      return state;
  }
};

export const getContentSections = state => state.content.sections || {};
