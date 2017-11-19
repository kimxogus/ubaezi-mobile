import React, { Component } from 'react';
import { Linking, Alert } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { isNil } from 'lodash';
import { withNavigation, NavigationActions } from 'react-navigation';

const ITEM_HEIGHT = 110;

const styles = {
  actionIconSize: 17,
};

const StoreItemWrapper = styled.View`
  justify-content: center;
  align-items: stretch;
  height: ${ITEM_HEIGHT}px;
  margin: 5px;
  border: 1px solid gray;
  border-radius: 10px;
`;

const StoreItemButton = styled.TouchableOpacity`
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
  padding-top: 6px;
  padding-left: 10px;
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
  background-color: rgba(50, 50, 50, 0.05);
`;

const Action = styled.TouchableOpacity`
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

const timeColorMap = {
  unknown: 'gray',
  available: 'rgb(50,50,255)',
  unavailable: '#C0392B',
};

const timeStatusMap = {
  UNKNOWN: 'unknown',
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
};

const timeMessageMap = {
  [timeStatusMap.UNKNOWN]: '영업시간 데이터가 없습니다ㅜㅜ',
  [timeStatusMap.AVAILABLE]:
    '현재 영업중입니다!\n(업체 사정에 따라 달라질 수 있음.)',
  [timeStatusMap.UNAVAILABLE]:
    '현재 영업중이 아닙니다ㅜ\n(업체 사정에 따라 달라질 수 있음.)',
};

class StoreItem extends Component {
  static height = ITEM_HEIGHT;

  storeStatus = () => {
    const { item: { timeFrom, timeTo } } = this.props;

    if (isNil(timeFrom) || isNil(timeTo)) {
      return timeStatusMap.UNKNOWN;
    }

    let hour = new Date().getHours();
    if (hour < timeFrom) {
      hour += 24;
    }
    return hour >= timeFrom && hour < timeTo
      ? timeStatusMap.AVAILABLE
      : timeStatusMap.UNAVAILABLE;
  };

  timeColor = () => timeColorMap[this.storeStatus()];

  onPressStore = () => {
    const { item: { id }, navigation: { dispatch } } = this.props;
    const action = NavigationActions.navigate({
      routeName: 'Store',
      action: NavigationActions.navigate({
        routeName: 'StoreDetail',
        params: { id },
      }),
    });
    dispatch(action);
  };

  onPressCall = async () => {
    const { item: { call } } = this.props;

    const url = `tel:${call}`;
    try {
      const canOpenUrl = await Linking.canOpenURL(url);
      if (canOpenUrl) {
        return Linking.openURL(url);
      }
    } catch (e) {}

    Alert.alert(
      '오류 발생!',
      '전화를 거는 중 오류가 발생했습니다.\n잠시후 다시 시도해주세요.'
    );
  };

  onPressTime = () => Alert.alert('', timeMessageMap[this.storeStatus()]);

  onPressStar = () => {
    const { addFavorite, removeFavorite, item: { id }, favorite } = this.props;

    if (favorite) {
      removeFavorite({ key: 'stores', id });
    } else {
      addFavorite({ key: 'stores', id });
    }
  };

  render() {
    const { item, favorite } = this.props;
    const { name, branch, condition } = item;
    return (
      <StoreItemWrapper>
        <StoreItemButton onPress={this.onPressStore}>
          <StoreInfoView>
            <TextRow>
              <Text size={23} weight={'bold'}>
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
          <Action onPress={this.onPressCall}>
            <FontAwesome
              name="phone"
              size={styles.actionIconSize}
              color="green"
            />
          </Action>
          <Action middle onPress={this.onPressTime}>
            <FontAwesome
              name="clock-o"
              size={styles.actionIconSize}
              color={this.timeColor()}
            />
          </Action>
          <Action onPress={this.onPressStar}>
            <FontAwesome
              name={favorite ? 'star' : 'star-o'}
              size={styles.actionIconSize}
              color="orange"
            />
          </Action>
        </BottomArea>
      </StoreItemWrapper>
    );
  }
}

export default withNavigation(StoreItem);
