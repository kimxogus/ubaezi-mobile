import { combineReducers } from 'redux';

import initApp from './initApp';
import nav from './nav';
import user from './user';

export default combineReducers({
  initApp,
  nav,
  user,
});
