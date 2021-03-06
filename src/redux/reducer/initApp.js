import { INIT_APP } from 'redux/action/type';

const initAppReducer = (state = false, { type }) => {
  switch (type) {
    case INIT_APP:
      return true;
    default:
      return state;
  }
};

export default initAppReducer;
