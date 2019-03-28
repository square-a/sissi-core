import _merge from 'lodash.merge';

import * as t from '%/actions/types';
import * as k from '%/constants/keywords';
import reorderArray from '%/helpers/reorderArray';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case t.SEND_REQUEST:
      if (payload.dataType === k.CONTENT) {
        return payload.responseData.global || initialState;
      }
      return state;

    case t.ADD_PAGE:
      return {
        ...state,
        _items: state._items.concat(payload.page._id),
      };

    case t.DELETE_PAGE:
      return {
        ...state,
        _items: state._items.filter(id => id !== payload.pageId),
      };

    case t.DRAG_ITEM:
      if (payload.itemType === k.PAGES) {
        return {
          ...state,
          _items: reorderArray(state._items, payload.from, payload.to),
        };
      }
      return state;


    case t.ADD_LIST_ITEM:
      if (payload.parentType === k.GLOBAL) {
        const newList = state[payload.listName].concat([payload.listItem]);
        return _merge({}, state, {
          [payload.listName]: newList,
        });
      }
      return state;

    case t.DELETE_LIST_ITEM:
      if (payload.parentType === k.GLOBAL) {
        return {
          ...state,
          [payload.listName]: state[payload.listName]
            .filter((i, index) => index !== payload.itemIndex),
        };
      }
      return state;

    case t.RESET_SESSION:
      return initialState;

    default:
      return state;
  }
}

export const getAllPageIds = state => state.content.global._items || [];
