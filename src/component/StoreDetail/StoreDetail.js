// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { isNumber } from 'lodash';

import ActionModal from 'component/Modal/ActionModal';
import { navigateModify } from 'action/suggestion';

import MenuGroups from './MenuGroups';

const keyMap = {
  name: {
    label: '상호명',
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
    const { name, label, getActions, data, dispatch } = this.props;

    return (
      <View key={`${name}`}>
        <ListItem
          title={
            data[name] && (data[name].length || isNumber(data[name]))
              ? data[name]
              : '-'
          }
          subtitle={label}
          onPress={this.toggleModal}
        />
        <ActionModal
          ref={ref => (this.modal = ref)}
          actions={getActions(data, dispatch)}
        />
      </View>
    );
  }
}

export default class StoreDetail extends Component {
  static propTypes = {
    data: PropTypes.any,
    loading: PropTypes.bool,
    load: PropTypes.func,
  };

  static defaultProps = {
    data: {},
    loading: false,
    load: () => {},
  };

  render() {
    const { loading, data, navigation: { dispatch } } = this.props;
    if (loading || !data) return null;

    const { id } = data;

    return (
      <ScrollView>
        <List>
          {keys.map(key => (
            <Row key={key.name} {...key} data={data} dispatch={dispatch} />
          ))}
        </List>
        <MenuGroups storeId={id} />
      </ScrollView>
    );
  }
}
