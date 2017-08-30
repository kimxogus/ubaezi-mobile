import { SET_CACHE } from 'redux/action/type';

const userReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_CACHE:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default userReducer;
