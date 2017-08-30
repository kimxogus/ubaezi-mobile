import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

const StoreItemWrapper = styled.View`
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const StoreItemName = styled.Text`font-size: 12px;`;

class StoreItem extends PureComponent {
  render() {
    const { item: { name } } = this.props;
    return (
      <StoreItemWrapper>
        <StoreItemName>{name}</StoreItemName>
      </StoreItemWrapper>
    );
  }
}

export default class StoreList extends PureComponent {
  keyExtractor(item) {
    return item.id;
  }

  renderItem = ({ item }) => <StoreItem item={item} />;

  render() {
    const { loading, data } = this.props;

    if (loading) {
      return null;
    }

    return (
      <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}
