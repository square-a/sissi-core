import { createSelector } from 'reselect';
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
        return payload.responseData.pages || initialState;
      }
      return state;

    case t.ADD_PAGE:
      return {
        ...state,
        [payload.page._id]: payload.page,
      };

    case t.DELETE_PAGE: {
      const { [payload.pageId]: pageToDelete, ...newState } = state;
      return newState;
    }

    case t.ADD_SECTION:
      return {
        ...state,
        [payload.pageId]: {
          ...state[payload.pageId],
          _items: state[payload.pageId]._items.concat(payload.section._id),
        },
      };

    case t.DELETE_SECTION:
      return {
        ...state,
        [payload.pageId]: {
          ...state[payload.pageId],
          _items: state[payload.pageId]._items.filter(id => id !== payload.sectionId),
        },
      };

    case t.DRAG_ITEM:
      if (payload.itemType === k.SECTIONS) {
        return {
          ...state,
          [payload.pageId]: {
            ...state[payload.pageId],
            _items: reorderArray(state[payload.pageId]._items, payload.from, payload.to),
          },
        };
      }
      return state;

    case t.ADD_LIST_ITEM:
      if (payload.parentType === k.PAGES) {
        const newList = state[payload.parentId][payload.listName].concat([payload.listItem]);
        return _merge({}, state, {
          [payload.parentId]: {
            [payload.listName]: newList,
          },
        });
      }
      return state;

    case t.DELETE_LIST_ITEM:
      if (payload.parentType === k.PAGES) {
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

export const getPageById = pageId => state => state.content.pages[pageId] || {};

export const getSectionIdsForPage = pageId => createSelector(
  [
    getPageById(pageId),
  ],
  page => page._items || []
);
