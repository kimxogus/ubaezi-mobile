// @flow
import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { isNil } from 'lodash';

import { select, call, takeLatest, put } from 'redux-saga/effects';

import rsf from 'lib/sagaFirebase';

import { ADD_SUGGESTION, REMOVE_SUGGESTION } from 'redux/action/type';

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
  field: string,
  value: string,
};

const addSuggestion = function*({
  path,
  suggestionType,
  id,
  field,
  value,
}: Suggestion) {
  const user = yield select(getUser);

  if (!user) {
    Alert.alert('로그인 필요', '즐겨찾기는 로그인 후 가능합니다!');
  } else if (!user.emailVerified) {
    Alert.alert(
      '이메일 인증 필요',
      '수정 제안 기능은 이메일 인증 후 가능합니다!'
    );
  } else if (
    !typeMap[suggestionType] ||
    !path ||
    !id ||
    !field ||
    isNil(value)
  ) {
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
      field,
      value,
    });
    yield put(NavigationActions.back());

    Alert.alert('완료!', '수정 제안이 생성되었습니다.');
  }
};

const removeSuggestion = function*({ id }: Suggestion) {
  const user = yield select(getUser);

  if (!user) {
    Alert.alert('로그인 필요', '즐겨찾기는 로그인 후 가능합니다!');
  } else if (!user.emailVerified) {
    Alert.alert(
      '이메일 인증 필요',
      '수정 제안 기능은 이메일 인증 후 가능합니다!'
    );
  } else if (!id) {
    Alert.alert(
      'Error!',
      '데이터에 오류가 발생했습니다.\n잠시후 다시 시도해주세요.'
    );
  } else {
    const { uid } = user;

    const { uid: userID } = yield call(rsf.database.read, `/suggestions/${id}`);

    if (uid !== userID) {
      Alert.alert('권한 오류', '본인이 생성한 제안만 삭제 가능합니다.');
      return;
    }

    yield call(rsf.database.delete, `/suggestions/${id}`);
    yield put(NavigationActions.back());
    Alert.alert('완료!', '수정 제안이 삭제되었습니다.');
  }
};

const suggestionSaga = function*() {
  yield takeLatest(ADD_SUGGESTION, addSuggestion);
  yield takeLatest(REMOVE_SUGGESTION, removeSuggestion);
};

export default suggestionSaga;
