import { createSelector } from 'reselect';

import * as s from '%/reducers/selectors';

export const getLocation = state => state.location;
export const getLocationPageId = state => (state.location.payload ? state.location.payload.pageId : null);
export const getCurrentRoute = state => state.location.type;

export const getIsInitialDataFetched = createSelector(
  [
    s.getContent,
  ],
  contentState => Object.keys(contentState.global).length > 0
);
