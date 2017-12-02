import React, { Component } from 'react';
import styled from 'styled-components/native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Text,
  Button,
} from 'react-native-elements';

const fieldMap = {
  name: {
    label: '이름',
    validate: value => (value && value.length ? null : '데이터가 비어있어요!'),
  },
  branch: {
    label: '지점',
    validate: value => (value && value.length ? null : '데이터가 비어있어요!'),
  },
  call: {
    label: '전화번호',
    validate: value => (value && value.length ? null : '데이터가 비어있어요!'),
  },
  address: {
    label: '주소',
    validate: value => (value && value.length ? null : '데이터가 비어있어요!'),
  },
  timeFrom: {
    label: '영업 시작시간',
    validate: value => (value && value.length ? null : '데이터가 비어있어요!'),
  },
  timeTo: {
    label: '영업 종료시간',
    validate: value => (value && value.length ? null : '데이터가 비어있어요!'),
  },
};

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: ${({ alignItems = 'center' }) => alignItems};
`;

export default class ModifySuggestionScreen extends Component {
  state = {
    value: '',
    error: fieldMap[this.props.field].validate(''),
  };

  onChangeText = text =>
    this.setState({
      value: text,
      error: fieldMap[this.props.field].validate(text),
    });

  submit = () => {};

  render() {
    const { field, data } = this.props;
    const { error } = this.state;

    if (!data) return null;

    return (
      <Container>
        <Container>
          <Text h2>{data.name}</Text>
          <Text h4>{fieldMap[field].label} 수정 제안하기</Text>
        </Container>
        <Container>
          <FormLabel>기존 데이터</FormLabel>
          <Text h4>{data[field]}</Text>
          <FormLabel>새 데이터</FormLabel>
          <FormInput onChangeText={this.onChangeText} />
          {error ? (
            <FormValidationMessage>{error}</FormValidationMessage>
          ) : null}
        </Container>
        <Container>
          <Button
            raised
            large
            disabled={!!error}
            title="제출하기"
            onPress={this.submit}
          />
        </Container>
      </Container>
    );
  }
}
