// @flow
import { Alert } from 'react-native';

import { select, call, takeLatest } from 'redux-saga/effects';

import rsf from 'lib/sagaFirebase';
import firebase from 'lib/firebase';

import { LIKE, UNLIKE_BY_ID, UNLIKE_BY_TARGET } from 'redux/action/type';

const getUser = ({ user }) => user;

const like = function*({ path, targetId, onEnd = () => {} }) {
  const user = yield select(getUser);

  if (!user) {
    Alert.alert('로그인 필요', '즐겨찾기는 로그인 후 가능합니다!');
  } else if (!user.emailVerified) {
    Alert.alert('이메일 인증 필요', '좋아요 기능은 이메일 인증 후 가능합니다!');
  } else if (!path || !targetId) {
    Alert.alert(
      'Error!',
      '데이터에 오류가 발생했습니다.\n잠시후 다시 시도해주세요.'
    );
  } else {
    const { uid } = user;
    const ref = firebase
      .database()
      .ref(`/likes`)
      .orderByChild('targetId')
      .equalTo(targetId);

    const found = yield call(rsf.database.read, ref);

    if (found && Object.keys(found).some(id => found[id].uid === uid)) {
      Alert.alert('오류', '이미 좋아요한 적이 있으세요!');
      return;
    }

    const createAt = new Date().getTime();

    const id = yield call(rsf.database.create, '/likes', {
      uid,
      createAt,
      path,
      targetId,
    });
    yield call(rsf.database.update, `${path}/${targetId}/likes/${id}`, uid);
  }
  onEnd();
  Alert.alert('완료!', '좋아요 완료!');
};

const unlikeById = function*({ id, onEnd = () => {} }) {
  const user = yield select(getUser);

  if (!user) {
    Alert.alert('로그인 필요', '즐겨찾기는 로그인 후 가능합니다!');
  } else if (!user.emailVerified) {
    Alert.alert('이메일 인증 필요', '좋아요 기능은 이메일 인증 후 가능합니다!');
  } else if (!id) {
    Alert.alert(
      'Error!',
      '데이터에 오류가 발생했습니다.\n잠시후 다시 시도해주세요.'
    );
  } else {
    const { uid } = user;

    const found = yield call(rsf.database.read, `/likes/${id}`);

    if (found) {
      if (
        Object.keys(found).some(foundLikeId => found[foundLikeId].uid !== uid)
      ) {
        Alert.alert('권한 오류', '본인이 생성한 좋아요만 삭제 가능합니다.');
        return;
      }

      yield call(rsf.database.delete, `/likes/${id}`);
    }
  }
  onEnd();
};

const unlikeByTarget = function*({ path, targetId, onEnd = () => {} }) {
  const user = yield select(getUser);

  if (!user) {
    Alert.alert('로그인 필요', '즐겨찾기는 로그인 후 가능합니다!');
  } else if (!user.emailVerified) {
    Alert.alert('이메일 인증 필요', '좋아요 기능은 이메일 인증 후 가능합니다!');
  } else if (!path || !targetId) {
    Alert.alert(
      'Error!',
      '데이터에 오류가 발생했습니다.\n잠시후 다시 시도해주세요.'
    );
  } else {
    const { uid } = user;
    const ref = firebase
      .database()
      .ref(`/likes`)
      .orderByChild('targetId')
      .equalTo(targetId);

    const found = yield call(rsf.database.read, ref);

    if (found) {
      if (Object.keys(found).some(id => found[id].uid !== uid)) {
        Alert.alert('권한 오류', '본인이 생성한 좋아요만 삭제 가능합니다.');
        return;
      }

      const ids = Object.keys(found);
      for (let i = 0; i < ids.length; i++) {
        yield call(rsf.database.delete, `/likes/${ids[i]}`);
        yield call(rsf.database.delete, `${path}/${targetId}/${ids[i]}`);
      }
    }
  }
  onEnd();
  Alert.alert('완료!', '좋아요 취소 완료!');
};

const suggestionSaga = function*() {
  yield takeLatest(LIKE, like);
  yield takeLatest(UNLIKE_BY_ID, unlikeById);
  yield takeLatest(UNLIKE_BY_TARGET, unlikeByTarget);
};

export default suggestionSaga;
