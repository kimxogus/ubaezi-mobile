// @flow
import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { select, call, takeLatest } from 'redux-saga/effects';

import rsf from 'lib/sagaFirebase';

import { ADD_SUGGESTION } from 'redux/action/type';

const getUser = ({ user }) => user;

const typeMap = {
  modify: {},
  create: {},
  delete: {},
};

export type Suggestion = {
  path: string,
  suggestionType: 'modify' | 'create' | 'delete',
  id: ?string,
  data: {
    [string]: number | string,
  },
};

const addSuggestion = function*({
  path,
  suggestionType,
  id,
  data,
}: Suggestion) {
  const user = yield select(getUser);

  if (!user) {
    Alert.alert('로그인 필요', '즐겨찾기는 로그인 후 가능합니다!');
  } else if (!user.emailVerified) {
    Alert.alert(
      '이메일 인증 필요',
      '수정 제안 기능은 이메일 인증 후 가능합니다!'
    );
  } else if (!typeMap[suggestionType] || !path || !id || !data) {
    Alert.alert(
      'Error!',
      '데이터에 오류가 발생했습니다.\n잠시후 다시 시도해주세요.'
    );
  } else {
    const { uid } = user;

    const createAt = new Date().getTime();

    yield call(rsf.database.create, '/suggestions', {
      uid,
      createAt,
      path,
      id,
      suggestionType,
      data,
    });

    NavigationActions.navigate({
      routeName: 'Store',
      action: NavigationActions.navigate({
        routeName: 'StoreDetail',
        params: { id },
      }),
    });
  }
};

const suggestionSaga = function*() {
  yield takeLatest(ADD_SUGGESTION, addSuggestion);
};

export default suggestionSaga;
