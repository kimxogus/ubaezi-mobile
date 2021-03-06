import React, { Component } from 'react';
import { Constants } from 'expo';

import TabNavigator from 'component/Navigator/TabNavigator';

export default class HomeScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      height: 0,
      marginTop: Constants.statusBarHeight,
    },
  };

  render() {
    return <TabNavigator />;
  }
}
