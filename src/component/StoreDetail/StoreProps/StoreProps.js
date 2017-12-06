import React, { Component } from 'react';
import { View, Linking } from 'react-native';
import { List, Card, ListItem } from 'react-native-elements';
import { isNumber } from 'lodash';

import ActionModal from 'component/Modal/ActionModal';
import { navigateModify } from 'action/suggestion';

const keyMap = {
  name: {
    label: '이름',
    getActions: (dispatch, { id }) => [
      {
        name: '수정 제안하기',
        action: () =>
          navigateModify({
            path: 'stores',
            targetId: id,
            field: 'name',
            dispatch,
          }),
      },
    ],
  },
  branch: {
    label: '지점',
    getActions: (dispatch, { id }) => [
      {
        name: '수정 제안하기',
        action: () =>
          navigateModify({
            path: 'stores',
            targetId: id,
            field: 'branch',
            dispatch,
          }),
      },
    ],
  },
  call: {
    label: '전화번호',
    getActions: (dispatch, { id, call }) => [
      {
        name: '전화하기',
        action: () => {
          Linking.openURL(`tel:${call}`);
        },
      },
      {
        name: '수정 제안하기',
        action: () =>
          navigateModify({
            path: 'stores',
            targetId: id,
            field: 'call',
            dispatch,
          }),
      },
    ],
  },
  condition: {
    label: '배달 조건',
    getActions: (dispatch, { id }) => [
      {
        name: '수정 제안하기',
        action: () =>
          navigateModify({
            path: 'stores',
            targetId: id,
            field: 'condition',
            dispatch,
          }),
      },
    ],
  },
  timeFrom: {
    label: '영업 시작시간',
    getActions: (dispatch, { id }) => [
      {
        name: '수정 제안하기',
        action: () =>
          navigateModify({
            path: 'stores',
            targetId: id,
            field: 'timeFrom',
            dispatch,
          }),
      },
    ],
  },
  timeTo: {
    label: '영업 종료시간',
    getActions: (dispatch, { id }) => [
      {
        name: '수정 제안하기',
        action: () =>
          navigateModify({
            path: 'stores',
            targetId: id,
            field: 'timeTo',
            dispatch,
          }),
      },
    ],
  },
  address: {
    label: '주소',
    getActions: (dispatch, { id }) => [
      {
        name: '수정 제안하기',
        action: () =>
          navigateModify({
            path: 'stores',
            targetId: id,
            field: 'address',
            dispatch,
          }),
      },
    ],
  },
};

const style = {
  suggestionList: {
    borderTopWidth: 0,
  },
  suggestion: {
    borderBottomWidth: 0,
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

  onPressSuggestion = (id, isLiked) => {
    const { dispatch, unlikeByTarget, like, load } = this.props;
    if (isLiked) {
      dispatch(unlikeByTarget('/suggestions', id, load));
    } else {
      dispatch(like('/suggestions', id, load));
    }
  };

  render() {
    const {
      user: { uid } = {},
      name,
      label,
      getActions,
      storeData,
      suggestions,
      dispatch,
    } = this.props;

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
          header={
            suggestions ? (
              <Card title="제안 리스트">
                <List containerStyle={style.suggestionList}>
                  {suggestions
                    .sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0))
                    .map(s => (
                      <ListItem
                        key={s.id}
                        title={s.value}
                        containerStyle={style.suggestion}
                        rightIcon={{
                          name:
                            s.likes &&
                            Object.keys(s.likes).some(id => s.likes[id] === uid)
                              ? 'favorite'
                              : 'favorite-border',
                          style: { color: 'palevioletred' },
                        }}
                        badge={
                          s.likes && Object.keys(s.likes).length
                            ? { value: Object.keys(s.likes).length }
                            : null
                        }
                        onPressRightIcon={() =>
                          this.onPressSuggestion(
                            s.id,
                            !!(
                              s.likes &&
                              Object.keys(s.likes).some(
                                id => s.likes[id] === uid
                              )
                            )
                          )
                        }
                      />
                    ))}
                </List>
              </Card>
            ) : null
          }
          actions={getActions(dispatch, storeData)}
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
    const suggestionMap = Object.keys(keyMap).reduce((a, b) => {
      a[b] = [];
      return a;
    }, {});
    if (Array.isArray(data)) {
      this.setState({
        suggestionMap: data.reduce((a, s) => {
          a[s.field].push(s);
          return a;
        }, suggestionMap),
      });
    } else {
      this.setState({
        suggestionMap,
      });
    }
  }

  render() {
    const {
      storeData,
      user,
      like,
      unlikeByTarget,
      navigation: { dispatch },
      load,
    } = this.props;
    const { suggestionMap } = this.state;

    return (
      <List>
        {keys.map(key => (
          <Row
            key={key.name}
            {...key}
            user={user}
            like={like}
            load={load}
            unlikeByTarget={unlikeByTarget}
            storeData={storeData}
            dispatch={dispatch}
            suggestions={suggestionMap[key.name]}
          />
        ))}
      </List>
    );
  }
}
