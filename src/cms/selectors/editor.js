import { createSelector } from 'reselect';

import * as c from '%/constants';
import * as s from '%/reducers/selectors';
import { getCurrentItemWithParent } from './item';

export const getPropsForEditor = createSelector(
  [
    getCurrentItemWithParent,
    s.getMaxAmountOfPages,
  ],
  ({ item, parent }, maxAmountOfPages) => {
    const existingItems =
      parent && parent.content && parent.content._items ? parent.content._items.length : 0;
    const canDelete = !item.structure.isProtected
      && parent !== null
      && parent.structure.minItems < existingItems;

    let viewLevel;
    if (item.type === c.GLOBAL) {
      viewLevel = 1;
    } else if (item.type === c.PAGES && item.structure.maxItems === 0) {
      viewLevel = 2;
    } else if (item.type === c.SECTIONS && maxAmountOfPages <= 1) {
      viewLevel = 2;
    } else if (item.type === c.PAGES && item.structure.maxItems > 0) {
      viewLevel = 3;
    } else if (item.type === c.SECTIONS && maxAmountOfPages > 1) {
      viewLevel = 4;
    }

    const initialValues = Object.entries(item.content)
      .reduce((acc, [key, value]) => {
        if (!key.startsWith('_')) {
          acc[key] = value;
        }

        return acc;
      }, {});

    return {
      canDelete,
      fieldNames: item.structure.fields,
      formName: item.id ? `${item.type}-${item.id}` : item.type,
      initialValues,
      viewLevel,
    };
  }
);
