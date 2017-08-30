import { combineReducers } from 'redux';

import initApp from './initApp';
import nav from './nav';
import user from './user';
import cache from './cache';

export default combineReducers({
  initApp,
  nav,
  user,
  cache,
});
