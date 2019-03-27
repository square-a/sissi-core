import { combineReducers } from 'redux';

import global from './global';
import pages from './pages';
import sections from './sections';

export default combineReducers({
  global,
  pages,
  sections,
});

export * from './global';
export * from './pages';
export * from './sections';

export const getContent = state => state.content;
