import { createSelector } from 'reselect';

import * as s from '%/reducers/selectors';
import { getMaxSectionsForPage } from './pages';
import {
  getCurrentItemBlueprintWithParent,
  getItemWithParent,
} from './item';

export const getPropsForNavItem = (id, type) => createSelector(
  [
    getCurrentItemBlueprintWithParent,
    getItemWithParent(id, type),
    s.getMaxAmountOfPages,
  ],
  ({ item: currentItem, parent: currentParent }, { item, parent }, maxAmountOfPages) => {
    let backLinkArray = [];

    if (parent && parent.id) {
      backLinkArray.push(parent.type);
      backLinkArray.push(parent.id);
    }

    const linkArray = backLinkArray.concat([type, id]);

    if (maxAmountOfPages <= 1) {
      backLinkArray = [];
    }

    return {
      isActive: currentItem.id === id || (!!currentParent && currentParent.id === id),
      backLinkArray,
      linkArray,
      title: (item.content && item.content.title) ? item.content.title : item.structure.label,
    };
  }
);

export const getPropsForPageNav = createSelector(
  [
    s.getAllPageIds,
    s.getMaxAmountOfPages,
  ],
  (pageIds, maxAmountOfPages) => {
    if (maxAmountOfPages > 1) {
      return {
        canAdd: maxAmountOfPages > pageIds.length,
        itemIds: pageIds,
      };
    }
    return null;
  }
);

export const getPropsForSectionNav = pageId => createSelector(
  [
    s.getSectionIdsForPage(pageId),
    getMaxSectionsForPage(pageId),
  ],
  (sectionIds, maxSections) => {
    if (pageId && maxSections > 0) {
      return {
        canAdd: maxSections > sectionIds.length,
        itemIds: sectionIds,
        pageId,
      };
    }
    return null;
  }
);
