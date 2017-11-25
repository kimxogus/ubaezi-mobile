import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';

export default class Menu extends Component {
  render() {
    console.log(this.props);
    const { name } = this.props;
    return <ListItem title={name} />;
  }
}
