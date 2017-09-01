import React from 'react';
import styled from 'styled-components/native';

const EmptyListWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Text = styled.Text`
  flex: 1;
  font-size: ${({ size = 30 }) => size}px;
  font-weight: ${({ weight = 'normal' }) => weight};
`;

export default ({ name = 'Empty!' } = {}) => () => (
  <EmptyListWrapper>
    <Text>{name}</Text>
  </EmptyListWrapper>
);
