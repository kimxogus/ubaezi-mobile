import React, { Component } from 'react';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

import { sizes } from 'styles';

import StoreList from 'component/StoreList';

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: stretch;
`;

export default class StoreListScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <FontAwesome name="list" size={sizes.icon} color={tintColor} />
    ),
  };

  processQuery = q => {
    const { category } = this.props;
    return category ? q : q.equalTo(category, 'category');
  };

  render() {
    return (
      <Container>
        <StoreList path="/stores" queryProcessor={this.processQuery} />
      </Container>
    );
  }
}
