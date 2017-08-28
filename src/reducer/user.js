import { SET_USER } from 'action/user';

const userReducer = (state = null, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return payload;
    default:
      return state;
  }
};

export default userReducer;
