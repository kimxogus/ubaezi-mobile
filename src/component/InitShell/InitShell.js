import React, { Component } from 'react';
import { AppLoading } from 'expo';

import progressive from 'HOC/progressive';

export default class InitShell extends Component {
  render() {
    const Children = progressive(this.props.children);
    return !this.props.initApp ? (
      <AppLoading />
    ) : (
      <Children {...this.props} {...this.state} />
    );
  }
}
