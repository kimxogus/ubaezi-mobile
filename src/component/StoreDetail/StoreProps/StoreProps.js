import React, { Component } from 'react';
import { View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { isNumber } from 'lodash';

import ActionModal from 'component/Modal/ActionModal';
import { navigateModify } from 'action/suggestion';
import { suggestion } from 'schema';

const keyMap = {
  name: {
    label: '이름',
    getActions: ({ id }, dispatch) => [
      {
        name: '수정 제안하기',
        action: () =>
          navigateModify({ path: 'stores', id, field: 'name', dispatch }),
      },
    ],
  },
  branch: {
    label: '지점',
    getActions: ({ id }, dispatch) => [
      {
        name: '수정 제안하기',
        action: () =>
          navigateModify({ path: 'stores', id, field: 'branch', dispatch }),
      },
    ],
  },
  call: {
    label: '전화번호',
    getActions: ({ id }, dispatch) => [
      {
        name: '수정 제안하기',
        action: () =>
          navigateModify({ path: 'stores', id, field: 'call', dispatch }),
      },
    ],
  },
  condition: {
    label: '배달 조건',
    getActions: ({ id }, dispatch) => [
      {
        name: '수정 제안하기',
        action: () =>
          navigateModify({ path: 'stores', id, field: 'condition', dispatch }),
      },
    ],
  },
  timeFrom: {
    label: '영업 시작시간',
    getActions: ({ id }, dispatch) => [
      {
        name: '수정 제안하기',
        action: () =>
          navigateModify({ path: 'stores', id, field: 'timeFrom', dispatch }),
      },
    ],
  },
  timeTo: {
    label: '영업 종료시간',
    getActions: ({ id }, dispatch) => [
      {
        name: '수정 제안하기',
        action: () =>
          navigateModify({ path: 'stores', id, field: 'timeTo', dispatch }),
      },
    ],
  },
  address: {
    label: '주소',
    getActions: ({ id }, dispatch) => [
      {
        name: '수정 제안하기',
        action: () =>
          navigateModify({ path: 'stores', id, field: 'address', dispatch }),
      },
    ],
  },
};

const keys = Object.keys(keyMap).map(k => ({
  name: k,
  label: keyMap[k].label,
  getActions: keyMap[k].getActions,
}));

class Row extends Component {
  modal = null;

  toggleModal = () => this.modal && this.modal.toggleVisible();

  render() {
    const {
      name,
      label,
      getActions,
      storeData,
      suggestions,
      dispatch,
    } = this.props;

    console.log(suggestions);

    return (
      <View key={`${name}`}>
        <ListItem
          title={
            storeData[name] &&
            (storeData[name].length || isNumber(storeData[name]))
              ? storeData[name]
              : '-'
          }
          subtitle={label}
          onPress={this.toggleModal}
          badge={
            suggestions && suggestions.length
              ? {
                  value: suggestions.length,
                }
              : null
          }
        />
        <ActionModal
          ref={ref => (this.modal = ref)}
          actions={getActions(storeData, dispatch)}
        />
      </View>
    );
  }
}

export default class StoreProps extends Component {
  suggestionsByField = {};
  componentWillReceiveProps({ data }) {
    if (Array.isArray(data)) {
      this.suggestionsByField = Object.keys(keyMap).reduce((a, b) => {
        a[b] = [];
        return a;
      }, {});
      data.forEach(s => {
        this.suggestionsByField[s.field].push(s);
      });
    }
  }

  render() {
    const { data, loading, storeData, navigation: { dispatch } } = this.props;
    if (loading || !data) return null;

    return (
      <List>
        {keys.map(key => (
          <Row
            key={key.name}
            {...key}
            storeData={storeData}
            dispatch={dispatch}
            suggestions={this.suggestionsByField[key.name]}
          />
        ))}
      </List>
    );
  }
}
