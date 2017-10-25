import React, { Component } from 'react';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { List, ListItem } from 'react-native-elements';

import { sizes } from 'styles';

import { logout } from 'action/auth';

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const T = styled.Text`
  flex: 1;
`;

const authActions = [
  {
    name: '로그아웃',
    action: () => logout(),
  },
];

export default class SettingsScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <FontAwesome name="cog" size={sizes.icon} color={tintColor} />
    ),
  };

  render() {
    const { user } = this.props;

    return user ? (
      <List>
        {authActions.map(({ name, action }, i) => (
          <ListItem key={`auth_${i}`} title={name} onPress={action} />
        ))}
      </List>
    ) : null;
  }
}
