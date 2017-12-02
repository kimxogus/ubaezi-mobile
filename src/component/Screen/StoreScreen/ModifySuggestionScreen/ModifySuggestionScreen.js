import React, { Component } from 'react';
import styled from 'styled-components/native';

import ModifySuggestionForm from './ModifySuggestionForm';

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: stretch;
`;

export default class ModifySuggestionScreen extends Component {
  render() {
    const { navigation: { state: { params = {} } = {} } } = this.props;
    return (
      <Container>
        <ModifySuggestionForm cacheFirst {...params} />
      </Container>
    );
  }
}
