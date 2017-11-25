import React, { Component } from 'react';
import styled from 'styled-components/native';

import StoreList from 'component/StoreList';

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: stretch;
`;

export default class StoreListScreen extends Component {
  processQuery = q => {
    const { category } = this.props;
    return (category ? q.equalTo(category, 'category') : q).orderByChild(
      'sortOrder'
    );
  };

  render() {
    return (
      <Container>
        <StoreList
          path="/stores"
          queryProcessor={this.processQuery}
          defaultValue={{}}
        />
      </Container>
    );
  }
}
