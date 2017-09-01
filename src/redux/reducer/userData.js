import { SET_USER_DATA, CLEAR_USER_DATA } from 'redux/action/type';

const EMPTY_USER_DATA = null;

const userDataReducer = (state = EMPTY_USER_DATA, { type, payload }) => {
  switch (type) {
    case SET_USER_DATA:
      return payload;
    case CLEAR_USER_DATA:
      return EMPTY_USER_DATA;
    default:
      return state;
  }
};

export default userDataReducer;
