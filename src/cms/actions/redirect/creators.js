import { redirect } from 'redux-first-router';

import * as routes from '%/router';

export const redirectToIndex = () => redirect({
  type: routes.ROUTE_INDEX,
});

export const redirectToLogin = () => redirect({
  type: routes.ROUTE_LOGIN,
});

export const redirectToPage = pageId => redirect({
  type: routes.ROUTE_PAGE,
  payload: { pageId },
});
