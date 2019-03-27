import * as k from '%/constants/keywords';

export const ROUTE_INDEX = 'routes/INDEX';
export const ROUTE_LOGIN = 'routes/LOGIN';
export const ROUTE_PAGE = 'routes/PAGE';
export const ROUTE_SECTION = 'routes/SECTION';

export default {
  [ROUTE_INDEX]: {
    path: '/',
    itemType: k.GLOBAL,
  },
  [ROUTE_LOGIN]: {
    path: '/login',
  },
  [ROUTE_PAGE]: {
    path: '/pages/:pageId',
    itemType: k.PAGES,
  },
  [ROUTE_SECTION]: {
    path: '/pages/:pageId/sections/:sectionId',
    itemType: k.SECTIONS,
  },
};
