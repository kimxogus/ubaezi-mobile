import { Alert } from 'react-native';

import { all, select, call, takeLatest } from 'redux-saga/effects';

import rsf from 'lib/sagaFirebase';

import { ADD_FAVORITE, REMOVE_FAVORITE } from 'redux/action/type';

const getUser = ({ user }) => user;

const addFavorite = function*({ key, id }) {
  const user = yield select(getUser);

  if (!user) {
    Alert.alert('로그인 필요', '즐겨찾기는 로그인 후 가능합니다!');
  } else if (!user.emailVerified) {
    Alert.alert('이메일 인증 필요', '즐겨찾기는 이메일 인증 후 가능합니다!');
  } else {
    const { uid } = user;

    const time = new Date().getTime();

    yield all([
      call(rsf.database.update, `/users/${uid}/favorites/${key}/${id}`, time),
      call(rsf.database.update, `/${key}/${id}/favoriteUsers/${uid}`, time),
    ]);
  }
};

const removeFavorite = function*({ key, id }) {
  const user = yield select(getUser);

  if (!user) {
    Alert.alert('로그인 필요', '즐겨찾기는 로그인 후 가능합니다!');
  } else if (!user.emailVerified) {
    Alert.alert('이메일 인증 필요', '즐겨찾기는 이메일 인증 후 가능합니다!');
  } else {
    const { uid } = user;

    yield all([
      call(rsf.database.update, `/users/${uid}/favorites/${key}/${id}`, null),
      call(rsf.database.update, `/${key}/${id}/favoriteUsers/${uid}`, null),
    ]);
  }
};

const favoriteSaga = function*() {
  yield takeLatest(ADD_FAVORITE, addFavorite);
  yield takeLatest(REMOVE_FAVORITE, removeFavorite);
};

export default favoriteSaga;
