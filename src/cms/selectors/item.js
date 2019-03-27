import { createSelector } from 'reselect';

import * as c from '%/constants';
import * as s from '%/reducers/selectors';
import { getLocation } from './location';
import selectItem from '%/helpers/selectItem';

export const getCurrentItemBlueprintWithParent = createSelector(
  [
    getLocation,
  ],
  ({ routesMap, type: locationType, payload }) => {
    const type = routesMap[locationType].itemType;
    let parent = null;
    let id = null;

    if (type === c.SECTIONS) {
      id = payload.sectionId;
      parent = {
        id: payload.pageId,
        type: c.PAGES,
      };

    } else if (type === c.PAGES) {
      id = payload.pageId;
      parent = {
        id: null,
        type: c.GLOBAL,
      };
    }

    return {
      item: {
        id,
        type,
      },
      parent,
    };
  }
);

export const getCurrentItemWithParent = createSelector(
  [
    getCurrentItemBlueprintWithParent,
    s.getContent,
    s.getStructure,
  ],
  ({ item: itemBlueprint, parent: parentBlueprint }, contentState, structureState) => ({
    item: selectItem(contentState, structureState, itemBlueprint.type, itemBlueprint.id),
    parent: parentBlueprint
      ? selectItem(contentState, structureState, parentBlueprint.type, parentBlueprint.id)
      : null,
  })
);

export const getItemWithParent = (id, type) => createSelector(
  [
    s.getContent,
    s.getStructure,
  ],
  (contentState, structureState) => {
    let parentBlueprint;

    if (type === c.SECTIONS) {
      parentBlueprint = {
        type: c.PAGES,
        id: Object.values(contentState.pages).find(page => page._items.includes(id))._id,
      };

    } else if (type === c.PAGES) {
      parentBlueprint = {
        type: c.GLOBAL,
        id: null,
      };
    }

    return {
      item: selectItem(contentState, structureState, type, id),
      parent: parentBlueprint
        ? selectItem(contentState, structureState, parentBlueprint.type, parentBlueprint.id)
        : null,
    };
  }
)
