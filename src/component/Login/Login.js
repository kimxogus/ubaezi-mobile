import React, { Component } from 'react';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const styles = {
  iconSize: 60,
};

const Container = styled.View`
  display: flex;
  flex: 1;
  align-items: stretch;
  justify-content: center;
`;

const Button = styled.TouchableHighlight`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 10px;
  border-radius: 30px;
  background-color: skyblue;
`;

const ContentWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Content = styled.Text`
  text-align: center;
  font-size: 45px;
`;

export default class Login extends Component {
  render() {
    return (
      <Container>
        <Button>
          <ContentWrapper>
            <Content>
              <MaterialCommunityIcons name="google" size={styles.iconSize} />
            </Content>
            <Content> </Content>
            <Content>구글 로그인</Content>
          </ContentWrapper>
        </Button>
        <Button>
          <ContentWrapper>
            <Content>
              <MaterialCommunityIcons name="facebook" size={styles.iconSize} />
            </Content>
            <Content> </Content>
            <Content>페이스북 로그인</Content>
          </ContentWrapper>
        </Button>
      </Container>
    );
  }
}
