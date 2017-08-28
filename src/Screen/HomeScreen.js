import React, { Component } from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const T = styled.Text`flex: 1;`;

export default () =>
  <Container>
    <T>Hi!</T>
  </Container>;
