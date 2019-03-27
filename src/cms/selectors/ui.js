import { createSelector } from 'reselect';

import { LOADING } from '%/constants/keywords';
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
