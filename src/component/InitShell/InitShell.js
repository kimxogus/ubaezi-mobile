import { Component, Children } from 'react';

export default class InitShell extends Component {
  render() {
    const { children } = this.props;
    return (children && Children.only(children)) || null;
  }
}
