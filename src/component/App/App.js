import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import Sentry from 'sentry-expo';
import { ThemeProvider } from 'styled-components';

import store from 'redux/store';
import { theme } from 'styles/theme';

import InitShell from 'component/InitShell';
import AppNavigator from 'component/Navigator/AppNavigator';

import sentryConfig from 'credential/sentry.json';

Sentry.config(sentryConfig.publicDsn).install();

class App extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;

    if (nav.index === 0) {
      return false;
    }

    dispatch(NavigationActions.back());
    return true;
  };

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
