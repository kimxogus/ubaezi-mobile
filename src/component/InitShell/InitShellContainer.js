import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { initApp as initAppAC } from 'redux/action/initApp';
import { setUser as setUserAC } from 'redux/action/user';

const Container = BaseComponent => {
  return connect(
    ({ init }) => ({ init }),
    dispatch => ({
      initApp: bindActionCreators(initAppAC, dispatch),
      setUser: bindActionCreators(setUserAC, dispatch),
    })
  )(BaseComponent);
};

export default Container;
