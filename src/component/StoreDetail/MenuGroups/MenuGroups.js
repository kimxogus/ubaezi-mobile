import React, { Component } from 'react';
import { Card } from 'react-native-elements';

import MenuList from './MenuList';

export default class MenuGroups extends Component {
  render() {
    const { data: menuGroups } = this.props;

    return Array.isArray(menuGroups) ? (
      <Card title="메뉴">
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
      </Card>
    ) : null;
  }
}
