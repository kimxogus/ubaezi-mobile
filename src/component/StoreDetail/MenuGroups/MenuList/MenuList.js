import React, { Component } from 'react';
import { List } from 'react-native-elements';

import Menu from './Menu';

const style = {
  borderTopWidth: 0,
};

export default class MenuList extends Component {
  render() {
    const { data: menus } = this.props;
    return Array.isArray(menus) ? (
      <List containerStyle={style}>
        {menus.map(menu => <Menu key={menu.id} {...menu} />)}
      </List>
    ) : null;
  }
}
