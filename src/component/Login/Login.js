import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import styled from 'styled-components/native';
import {
  Button,
  FormInput,
  FormLabel,
  FormValidationMessage,
} from 'react-native-elements';

import { createUser, login } from 'action/auth';

const Container = styled.View`
  display: flex;
  flex: 1;
  align-items: stretch;
  justify-content: center;
`;

const ContentWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Blank = styled.View`
  height: 15;
`;

const style = {
  button: {
    height: 40,
  },
};

const icon = {
  login: { name: 'check' },
  register: { name: 'account-circle' },
  back: { name: 'arrow-back' },
};

export default class Login extends Component {
  state = {
    isRegistering: false,
    email: null,
    password: null,
    passwordCheck: null,
  };

  switch = () =>
    this.setState(({ isRegistering }) => ({
      isRegistering: !isRegistering,
    }));

  login = async () => {
    const { email, password } = this.state;
    try {
      await login(email, password);
    } catch (e) {
      Alert.alert('', e.message);
    }
  };

  register = async () => {
    const { email, password, passwordCheck } = this.state;
    if (password && password.length >= 5 && password === passwordCheck) {
      try {
        await createUser(email, password);
        Alert.alert(
          '가입 완료!',
          [
            '유배지에 가입하신 것을 환영합니다.',
            '가입한 메일의 이메일 인증을 꼭 진행해주세요.',
            '받은 편지함을 확인해보세요!',
            '- 인증되지 않은 메일은 즐겨찾기, 제안을 사용할 수 없습니다.',
          ].join('\n')
        );
      } catch (e) {
        Alert.alert('', e.message);
      }
    } else {
      Alert.alert('', '비밀번호를 다시 확인해주세요');
    }
  };

  onChangeEmail = email => this.setState({ email });

  onChangePassword = password => this.setState({ password });

  onChangePasswordCheck = passwordCheck => this.setState({ passwordCheck });

  render() {
    const { isRegistering, password } = this.state;
    return (
      <Container>
        <ContentWrapper>
          <View>
            <FormLabel>UNIST E-mail (@unist.ac.kr)</FormLabel>
            <FormInput
              onChangeText={this.onChangeEmail}
              keyboardType="email-address"
            />
          </View>
          <View>
            <FormLabel>Password</FormLabel>
            <FormInput onChangeText={this.onChangePassword} secureTextEntry />
            {password && password.length >= 5 ? null : (
              <FormValidationMessage>5자리 이상 입력해주세요.</FormValidationMessage>
            )}
          </View>
          {isRegistering ? (
            <View>
              <FormLabel>Password Check</FormLabel>
              <FormInput
                onChangeText={this.onChangePasswordCheck}
                secureTextEntry
              />
            </View>
          ) : null}
          <Blank />
          {isRegistering ? (
            <ButtonBox>
              <Button
                buttonStyle={style.button}
                onPress={this.switch}
                title="BACK"
                large
                raised
                icon={icon.back}
              />
              <Button
                buttonStyle={style.button}
                onPress={this.register}
                title="REGISTER"
                large
                raised
                icon={icon.register}
              />
            </ButtonBox>
          ) : (
            <ButtonBox>
              <Button
                buttonStyle={style.button}
                onPress={this.login}
                title="LOGIN"
                large
                raised
                icon={icon.login}
              />
              <Button
                buttonStyle={style.button}
                onPress={this.switch}
                title="REGISTER"
                large
                raised
                icon={icon.register}
              />
            </ButtonBox>
          )}
        </ContentWrapper>
      </Container>
    );
  }
}
