import React, { Component } from 'react';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

import { sizes } from 'styles';

import StoreList from 'component/StoreList';

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const T = styled.Text`flex: 1;`;

export default class FavoriteScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) =>
      <FontAwesome name="star" size={sizes.icon} color={tintColor} />,
  };

  processQuery(q) {
    return q.orderByChild('sortOrder').limitToFirst(10);
  }

  render() {
    const { user } = this.props;
    return (
      <Container>
        <T>Favorite</T>
        {user && user.uid
          ? <StoreList
              path={`/users/${user.uid}/favorites/stores`}
              queryProcessor={this.processQuery}
            />
          : <T>Login!</T>}
      </Container>
    );
  }
}
