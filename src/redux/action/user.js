import { SET_USER } from './type';

const setUser = payload => ({
  type: SET_USER,
  payload,
});

export { setUser };
