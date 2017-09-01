import React, { Component } from 'react';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

import { sizes } from 'styles';

import StoreList from 'component/StoreList';
import Login from 'component/Login';

const Container = styled.View`
  display: flex;
  flex: 1;
  align-items: stretch;
  justify-content: center;
`;

export default class FavoriteScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <FontAwesome name="star" size={sizes.icon} color={tintColor} />
    ),
  };

  processQuery(q) {
    return q.limitToFirst(10);
  }

  render() {
    const { user } = this.props;
    return (
      <Container>
        {user && user.uid ? (
          <StoreList
            referencePath={`/stores`}
            path={`/users/${user.uid}/favorites/stores`}
            queryProcessor={this.processQuery}
          />
        ) : (
          <Login />
        )}
      </Container>
    );
  }
}
