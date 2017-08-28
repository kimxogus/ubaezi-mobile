import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import store from 'store';

import InitShell from 'component/InitShell';
import AppNavigator from 'component/Navigator/AppNavigator';

class App extends Component {
  render() {
    const { dispatch, nav } = this.props;

    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
        })}
      />
    );
  }
}

const mapStateToProps = ({ nav }) => ({ nav });

const AppWithNavigationState = connect(mapStateToProps)(App);

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <InitShell>
          <AppWithNavigationState />
        </InitShell>
      </Provider>
    );
  }
}
