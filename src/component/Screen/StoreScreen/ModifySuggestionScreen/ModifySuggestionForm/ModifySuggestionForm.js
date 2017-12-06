import React, { Component } from 'react';
import styled from 'styled-components/native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Text,
  Button,
} from 'react-native-elements';

import { store as fieldMap } from 'lib/fieldMap';

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

  submit = () => {
    const { path, targetId, field, addSuggestion } = this.props;
    const { value } = this.state;

    addSuggestion({
      suggestionType: 'modify',
      path,
      targetId,
      field,
      value,
    });
  };

  render() {
    const { field, data } = this.props;
    const { value, error } = this.state;

    if (!data) return null;

    return (
      <Container>
        <Container>
          <Text h2>{data.name}</Text>
          <Text h4>{fieldMap[field].label} 수정 제안하기</Text>
        </Container>
        <Container>
          <FormLabel>기존 데이터</FormLabel>
          <Text h4>{data[field] || '-'}</Text>
          <FormLabel>새 데이터</FormLabel>
          <FormInput
            value={value}
            onChangeText={this.onChangeText}
            keyboardType={fieldMap[field].keyboardType}
          />
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
