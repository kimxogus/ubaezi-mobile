import { combineReducers } from 'redux';
import AppNavigator from 'Navigator/AppNavigator';

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams(AppNavigator.initialRouteName)
);

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

export default combineReducers({
  nav: navReducer,
});
