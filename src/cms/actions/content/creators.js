import * as k from '%/constants/keywords';
import * as t from '%/actions/types';
import * as s from '%/selectors';
import {
  redirectToPage,
  redirectToIndex,
} from '%/actions/redirect/creators';

export const addPage = pageType => ({
  type: t.ADD_PAGE,
  payload: { pageType },
});

export const addSection = (pageId, sectionType) => ({
  type: t.ADD_SECTION,
  payload: { pageId, sectionType },
});

export const addListItem = listName => ({
  type: t.ADD_LIST_ITEM,
  payload: { listName },
});

export const deletePage = pageId => ({
  type: t.DELETE_PAGE,
  payload: { pageId },
});

export const deleteSection = (pageId, sectionId) => ({
  type: t.DELETE_SECTION,
  payload: { pageId, sectionId },
});

export const deleteItem = () => (dispatch, getState) => {
  const { item, parent } = s.getCurrentItemBlueprintWithParent(getState());
  if (item.type === k.SECTIONS) {
    dispatch(deleteSection(parent.id, item.id));
    dispatch(redirectToPage(parent.id));
  } else {
    dispatch(deletePage(item.id));
    dispatch(redirectToIndex());
  }
};

export const deleteListItem = (listName, itemIndex) => ({
  type: t.DELETE_LIST_ITEM,
  payload: { listName, itemIndex },
});

export const dragItem = (itemType, from, to, pageId) => ({
  type: t.DRAG_ITEM,
  payload: {
    itemType,
    from,
    to,
    pageId,
  },
});
