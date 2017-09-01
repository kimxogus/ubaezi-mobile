import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { initApp as initAppAC } from 'redux/action/initApp';
import {
  setUser as setUserAC,
  setUserData as setUserDataAC,
  clearUserData as clearUserDataAC,
} from 'redux/action/user';

const Container = BaseComponent =>
  connect(
    ({ init }) => ({ init }),
    dispatch => ({
      initApp: bindActionCreators(initAppAC, dispatch),
      setUser: bindActionCreators(setUserAC, dispatch),
      setUserData: bindActionCreators(setUserDataAC, dispatch),
      clearUserData: bindActionCreators(clearUserDataAC, dispatch),
    })
  )(BaseComponent);

export default Container;
