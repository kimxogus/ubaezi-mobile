import React, { Component } from 'react';
import { List } from 'react-native-elements';

import Menu from './Menu';

export default class MenuList extends Component {
  render() {
    const { data: menus } = this.props;
    return Array.isArray(menus) ? (
      <List>{menus.map(menu => <Menu key={menu.id} {...menu} />)}</List>
    ) : null;
  }
}
