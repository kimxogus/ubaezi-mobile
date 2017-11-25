import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';

import MenuList from './MenuList';

export default class MenuGroups extends Component {
  render() {
    const { data: menuGroups } = this.props;
    console.log(menuGroups);
    return Array.isArray(menuGroups) ? (
      <List>
        {menuGroups.map(menuGroup => {
          const { id } = menuGroup;
          return (
            <MenuList
              key={id}
              menuGroup={menuGroup}
              path="/stores"
              queryProcessor={this.processQuery}
              defaultValue={{}}
            />
          );
        })}
      </List>
    ) : null;
  }
}
