import React, { Component } from 'react';
import { Linking } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { Button } from 'react-native-elements';

import { sizes } from 'styles';

import StoreList from 'component/StoreList';
import Login from 'component/Login';

const Container = styled.View`
  display: flex;
  flex: 1;
  align-items: stretch;
  justify-content: center;
`;

const VerifyMessage = styled.Text`
  text-align: center;
  font-size: 20px;
  line-height: 25px;
`;

const Blank = styled.View`
  height: 25px;
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

  linkUnistMail = () => {
    Linking.openURL('https://mail.unist.ac.kr');
  };

  render() {
    const { user } = this.props;
    return (
      <Container>
        {user && user.uid ? (
          user.emailVerified ? (
            <StoreList
              cacheFirst
              defaultValue={{}}
              referencePath={`/stores`}
              path={`/users/${user.uid}/favorites/stores`}
              queryProcessor={this.processQuery}
            />
          ) : (
            [
              <VerifyMessage key="verify-message">
                {[
                  '즐겨찾기, 제안 기능은 인증한',
                  '사용자에게만 열립니다!.',
                  '',
                  '- 인증 방법 -',
                  '1. 유니스트 메일',
                  '2. 받은편지함(혹은 정크메일) 확인',
                  '3. 유배지 인증 메일의 링크 클릭!',
                ].join('\n')}
              </VerifyMessage>,
              <Blank key="blank" />,
              <Button
                title="유니스트 메일로 가기"
                key="button_unist_mail"
                onPress={this.linkUnistMail}
              />,
            ]
          )
        ) : (
          <Login />
        )}
      </Container>
    );
  }
}
