import React, { Component } from 'react';
import styled from 'styled-components/native';

import StoreDetail from 'component/StoreDetail';

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: stretch;
`;

export default class StoreDetailScreen extends Component {
  render() {
    const { navigation: { state: { params: { id } = {} } = {} } } = this.props;
    return (
      <Container>
        <StoreDetail cacheFirst path="stores" id={id} />
      </Container>
    );
  }
}
