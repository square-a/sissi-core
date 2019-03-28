import { createSelector } from 'reselect';

import * as k from '%/constants/keywords';
import * as s from '%/reducers/selectors';
import { getLocationPageId } from './location';

export const getSinglePageId = createSelector(
  [
    s.getAllPageIds,
    s.getMaxAmountOfPages,
  ],
  (pageIds, maxAmountOfPages) => (maxAmountOfPages <= 1 ? pageIds[0] : null)
);

export const getMaxSectionsForPage = pageId => createSelector(
  [
    s.getPageById(pageId),
    s.getStructurePages,
  ],
  ({ _type: pageType }, structurePages) => (structurePages[pageType] ? structurePages[pageType].maxItems : Infinity)
);

export const getActivePageId = createSelector(
  [
    getLocationPageId,
    getSinglePageId,
  ],
  (locationPageId, singlePageId) => singlePageId || locationPageId
);

export const getAllowedPageTypes = createSelector(
  [
    s.getStructurePages,
  ],
  structurePages => Object.entries(structurePages).reduce((acc, [pageType, page]) => {
    if (!page.isProtected) {
      acc.push({ name: pageType, label: page.label });
    }
    return acc;
  }, [])
);

export const getAllowedSectionTypesForPageId = pageId => createSelector(
  [
    s.getPageById(pageId),
    s.getMaxAmountOfPages,
    s.getStructurePages,
    s.getStructureSections,
  ],
  ({ _type: pageType }, maxAmountOfPages, structurePages, structureSections) => {
    let allowedTypes;

    if (maxAmountOfPages > 1) {
      allowedTypes = structurePages[pageType] && structurePages[pageType].allowedItems
        ? structurePages[pageType].allowedItems
        : [k.STANDARD];
    } else {
      allowedTypes = Object.keys(structureSections);
    }
    return allowedTypes.map(type =>  ({ name: type, label: structureSections[type].label }));
  }
);
