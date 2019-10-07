import { createSelector } from 'reselect';

import * as s from '%/reducers/selectors';
import { getCurrentItemWithParent } from './item';

export const getFieldWithName = fieldName => createSelector(
  [
    s.getFields,
  ],
  fields => ({ ...fields[fieldName], _name: fieldName })
);

export const getFieldsForPageType = pageType => createSelector(
  [
    s.getFields,
    s.getStructurePages,
  ],
  (fields, structurePages) => structurePages[pageType].fields.map(fieldName => ({
    ...fields[fieldName],
    _name: fieldName,
  }))
);

export const getFieldsForSectionType = sectionType => createSelector(
  [
    s.getFields,
    s.getStructureSections,
  ],
  (fields, structureSections) => structureSections[sectionType].fields.map(fieldName => ({
    ...fields[fieldName],
    _name: fieldName,
  }))
);

export const getPropsForFieldList = listName => createSelector(
  [
    s.getFieldList(listName),
    getCurrentItemWithParent,
  ],
  (fieldList, { item: listParent }) => {
    if (listName) {
      const listLength = listParent.content[listName] ? listParent.content[listName].length : 0;
      return {
        canAdd: listLength < fieldList.maxItems,
        canDelete: listLength > fieldList.minItems,
        itemLabel: fieldList.itemLabel,
        listLabel: fieldList.label,
      };
    }
    return {};
  }
);
