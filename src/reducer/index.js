import { combineReducers } from 'redux';
import RootNavigator from 'Navigator/RootNavigator';

const initialState = RootNavigator.router.getStateForAction(
  RootNavigator.router.getActionForPathAndParams('Home')
);

const navReducer = (state = initialState, action) => {
  const nextState = RootNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

export default combineReducers({
  nav: navReducer,
});
