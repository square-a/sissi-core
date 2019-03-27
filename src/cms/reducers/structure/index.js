import { combineReducers } from 'redux';

import fields from './fields';
import global from './global';
import pages from './pages';
import sections from './sections';
import settings from './settings';

export default combineReducers({
  fields,
  global,
  pages,
  sections,
  settings,
});

export * from './fields';
export * from './global';
export * from './pages';
export * from './sections';
export * from './settings';

export const getStructure = state => state.structure;
