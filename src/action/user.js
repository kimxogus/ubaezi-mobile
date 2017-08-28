import { SET_USER } from 'action/type';

const setUser = payload => ({
  type: SET_USER,
  payload,
});

export { setUser };
