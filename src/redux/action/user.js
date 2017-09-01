import { SET_USER, SET_USER_DATA, CLEAR_USER_DATA } from './type';

const setUser = payload => ({
  type: SET_USER,
  payload,
});

const setUserData = payload => ({
  type: SET_USER_DATA,
  payload,
});

const clearUserData = () => ({
  type: CLEAR_USER_DATA,
});

export { setUser, setUserData, clearUserData };
