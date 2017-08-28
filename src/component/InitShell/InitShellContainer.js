import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import firebase from 'lib/firebase';
import { initApp as initAppAC } from 'redux/action/initApp';
import { setUser as setUserAC } from 'redux/action/user';

const Container = BaseComponent => {
  class InitShellContainer extends Component {
    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        const { init, initApp, setUser } = this.props;
        setUser(user);
        if (!init) initApp();
      });
    }
    render() {
      return <BaseComponent {...this.props} />;
    }
  }
  InitShellContainer = connect(
    ({ init }) => ({ init }),
    dispatch => ({
      initApp: bindActionCreators(initAppAC, dispatch),
      setUser: bindActionCreators(setUserAC, dispatch),
    })
  )(InitShellContainer);
  return InitShellContainer;
};

export default Container;
