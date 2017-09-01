import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';

const styles = {
  actionIconSize: 17,
};

const StoreItemWrapper = styled.View`
  justify-content: center;
  align-items: stretch;
  height: 110px;
  margin: 5px;
  border: 1px solid gray;
  border-radius: 10px;
`;

const StoreItemButton = styled.TouchableHighlight`
  flex: 1;
  justify-content: center;
  align-items: stretch;
`;

const StoreInfoView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: stretch;
`;

const TextRow = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 6px;
  padding-right: 10px;
  padding-bottom: 0;
  justify-content: space-between;
`;

const Text = styled.Text`
  font-size: ${({ size = 12 }) => size}px;
  font-weight: ${({ weight = 'normal' }) => weight};
`;

const BottomArea = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Action = styled.TouchableHighlight`
  flex: 1;
  border-color: black;
  border-top-width: 0.5px;
  ${({ middle }) =>
    middle
      ? `
    border-left-width: 0.5px;
    border-right-width: 0.5px;`
      : ''};
  justify-content: center;
  align-items: center;
`;

class StoreItem extends PureComponent {
  render() {
    const { item, favorite } = this.props;
    const { name, branch, condition, call, timeFrom, timeTo } = item;
    return (
      <StoreItemWrapper>
        <StoreItemButton>
          <StoreInfoView>
            <TextRow>
              <Text size={27} weight={'bold'}>
                {name}
              </Text>
              <MaterialCommunityIcons name="chevron-right" size={20} />
            </TextRow>
            <TextRow>
              <Text>{branch}</Text>
              <Text>{condition}</Text>
            </TextRow>
          </StoreInfoView>
        </StoreItemButton>
        <BottomArea>
          <Action>
            <FontAwesome name="phone" size={styles.actionIconSize} />
          </Action>
          <Action middle>
            <FontAwesome name="clock-o" size={styles.actionIconSize} />
          </Action>
          <Action>
            <FontAwesome
              name={favorite ? 'star' : 'star-o'}
              size={styles.actionIconSize}
              color="yellow"
            />
          </Action>
        </BottomArea>
      </StoreItemWrapper>
    );
  }
}

export default class StoreList extends PureComponent {
  favorites = {};

  componentWillReceiveProps({ favorites }) {
    if (favorites && Object.keys(favorites).length) {
      this.favorites = favorites;
    }
  }

  keyExtractor = item => item.id;

  renderItem = ({ item }) => (
    <StoreItem item={item} favorite={!!this.favorites[item.id]} />
  );

  render() {
    const { data } = this.props;

    return (
      <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        extraData={this.favorites}
      />
    );
  }
}
