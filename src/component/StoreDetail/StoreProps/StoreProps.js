import React, { Component } from 'react';
import { View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { isNumber } from 'lodash';

import ActionModal from 'component/Modal/ActionModal';
import { navigateModify } from 'action/suggestion';

const keyMap = {
  name: {
    label: '이름',
    getActions: (dispatch, { id }, suggestions) => [
      {
        name: '수정 제안하기',
        action: () =>
          navigateModify({ path: 'stores', id, field: 'name', dispatch }),
      },
    ],
  },
  branch: {
    label: '지점',
    getActions: (dispatch, { id }) => [
      {
        name: '수정 제안하기',
        action: () =>
          navigateModify({ path: 'stores', id, field: 'branch', dispatch }),
      },
    ],
  },
  call: {
    label: '전화번호',
    getActions: (dispatch, { id }) => [
      {
        name: '수정 제안하기',
        action: () =>
          navigateModify({ path: 'stores', id, field: 'call', dispatch }),
      },
    ],
  },
  condition: {
    label: '배달 조건',
    getActions: (dispatch, { id }) => [
      {
        name: '수정 제안하기',
        action: () =>
          navigateModify({ path: 'stores', id, field: 'condition', dispatch }),
      },
    ],
  },
  timeFrom: {
    label: '영업 시작시간',
    getActions: (dispatch, { id }) => [
      {
        name: '수정 제안하기',
        action: () =>
          navigateModify({ path: 'stores', id, field: 'timeFrom', dispatch }),
      },
    ],
  },
  timeTo: {
    label: '영업 종료시간',
    getActions: (dispatch, { id }) => [
      {
        name: '수정 제안하기',
        action: () =>
          navigateModify({ path: 'stores', id, field: 'timeTo', dispatch }),
      },
    ],
  },
  address: {
    label: '주소',
    getActions: (dispatch, { id }) => [
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
  static defaultProps = {
    suggestions: [],
  };

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

    console.log(suggestions); // eslint-disable-line

    return (
      <View key={name}>
        <ListItem
          title={
            storeData[name] &&
            (storeData[name].length || isNumber(storeData[name]))
              ? storeData[name]
              : '-'
          }
          subtitle={label}
          onPress={this.toggleModal}
          badge={suggestions.length ? { value: suggestions.length } : null}
        />
        <ActionModal
          ref={ref => (this.modal = ref)}
          actions={getActions(dispatch, storeData, suggestions)}
        />
      </View>
    );
  }
}

export default class StoreProps extends Component {
  state = {
    suggestionMap: {},
  };
  componentWillReceiveProps({ data }) {
    if (Array.isArray(data)) {
      const suggestionMap = Object.keys(keyMap).reduce((a, b) => {
        a[b] = [];
        return a;
      }, {});
      this.setState({
        suggestionMap: data.reduce((a, s) => a[s.field].push(s), suggestionMap),
      });
    }
  }

  render() {
    const { data, loading, storeData, navigation: { dispatch } } = this.props;
    if (loading || !data) return null;
    const { suggestionMap } = this.state;

    return (
      <List>
        {keys.map(key => (
          <Row
            key={key.name}
            {...key}
            storeData={storeData}
            dispatch={dispatch}
            suggestions={suggestionMap[key.name]}
          />
        ))}
      </List>
    );
  }
}
