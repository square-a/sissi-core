import { createSelector } from 'reselect';
import _flatten from 'lodash.flatten';

import { LOADING } from '%/constants/keywords';
import { ROUTE_PAGE } from '%/router';
import { getLocation } from '%/selectors/location';
import * as s from '%/reducers/selectors';
import * as tr from '%/translations';

export const getPropsForAlert = createSelector(
  [
    s.getAlert,
    s.getIsLoading,
  ],
  (alert, isLoading) => {
    if (isLoading) {
      return {
        allowConfirm: false,
        type: LOADING,
        message: tr.LOADING_TEXT,
        title: tr.LOADING,
      };
    }

    return {
      allowConfirm: alert.message !== tr.ERROR_SERVER,
      ...alert,
    };
  }
);

export const getAutocompleteItems = source => createSelector(
  [
    s.getContent,
  ],
  content => {
    const [contentType, itemType, fieldType] = source.split('.');
    const autocompleteItems = Object.values(content[contentType])
      .filter(item => item._type === itemType)
      .reduce((acc, item) => {
        const value = item[fieldType];
        if (value.length > 0) {
          acc.push(value);
        }
        return _flatten(acc);
      }, []);

    return Array.from(new Set(autocompleteItems));
  }
);

export const getIsIndexPathField = fieldName => createSelector(
  [
    getLocation,
    s.getAllPageIds,
  ],
  ({ type, payload }, pageIds) => (
    fieldName === 'path' && type === ROUTE_PAGE && pageIds[0] === payload.pageId
  )
);
