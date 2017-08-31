import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import Sentry from 'sentry-expo';
import { ThemeProvider } from 'styled-components';

import store from 'redux/store';
import { theme } from 'styles';

import InitShell from 'component/InitShell';
import AppNavigator from 'component/Navigator/AppNavigator';

import sentryConfig from 'credential/sentry.json';

Sentry.config(sentryConfig.publicDsn).install();

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
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <InitShell>
            <AppWithNavigationState />
          </InitShell>
        </Provider>
      </ThemeProvider>
    );
  }
}
